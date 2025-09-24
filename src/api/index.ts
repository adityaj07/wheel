import {env} from "@/config";
import {tokenStore} from "@/storage/secureStorage";
import {StatusCodes} from "@/utils/statusCodes";
import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {toast} from "sonner-native";

const API_BASE_URL = env.API_BASE_URL || "http://192.168.31.136:3000/api/v1";

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

type failedQueueType = {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
};

let isRefreshing = false;
let failedQueue: failedQueueType[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({resolve, reject, config}) => {
    if (error) {
      return reject(error);
    }
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    resolve();
  });
  failedQueue = [];
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
});

// attach accestoken here
api.interceptors.request.use(config => {
  const accessToken = tokenStore.getAccessToken();
  if (accessToken && config && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// on res status 401, try refresh
api.interceptors.response.use(
  res => res,
  async (err: AxiosError & {config?: ExtendedAxiosRequestConfig}) => {
    const originalRequest = err.config;
    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(err);
    }

    if (err.response?.status === StatusCodes.UNAUTHORIZED.code) {
      // Do not try to refresh for refresh-token endpoint or logout to avoid loops
      if (
        originalRequest.url?.includes("/auth/refresh-token") ||
        originalRequest.url?.includes("/auth/logout")
      ) {
        return Promise.reject(err);
      }

      if (isRefreshing) {
        // queue req until refresh finishes
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => {
              //retry after token refreshed
              originalRequest._retry = true;
              resolve(api(originalRequest));
            },
            reject,
            config: originalRequest,
          });
        });
      }

      isRefreshing = true;
      originalRequest._retry = true;

      const refreshToken = tokenStore.getRefreshToken();
      if (!refreshToken) {
        isRefreshing = false;
        return Promise.reject(err);
      }

      try {
        const resp = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          {
            refreshToken,
          },
          {
            timeout: 15_000,
          },
        );

        const {
          accessToken,
          refreshToken: newRefreshToken,
          expiresAt,
        } = resp.data;

        // save the tokens
        tokenStore.saveTokens({
          accessToken,
          refreshToken: newRefreshToken,
          expiresAt,
        });

        //set Authorization header for new retries
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        processQueue(null, accessToken);
        isRefreshing = false;

        //retry original request
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        // If refresh failed, clear the tokens and propagate so the authcontext logout
        tokenStore.clear();

        toast.error("Session Expired.", {
          description: "Please login again.",
        });

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  },
);
