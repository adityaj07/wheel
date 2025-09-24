import {env} from "@/config";
import {tokenStore} from "@/storage/secureStorage";
import Logger from "@/utils/Logger";
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
  headers: {
    "Content-Type": "application/json",
  },
});

// attach accestoken here
api.interceptors.request.use(
  config => {
    const accessToken = tokenStore.getAccessToken();

    Logger.authDebug("API Request interceptor", {
      url: config.url,
      method: config.method,
      hasToken: !!accessToken,
      hasAuthHeader: !!config.headers?.Authorization,
    });

    if (accessToken && config && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    Logger.authError("Request interceptor error", error);
    return Promise.reject(error);
  },
);

// on res status 401, try refresh
api.interceptors.response.use(
  res => {
    Logger.authDebug("API Response success", {
      url: res.config.url,
      status: res.status,
    });
    return res;
  },
  async (err: AxiosError & {config?: ExtendedAxiosRequestConfig}) => {
    const originalRequest = err.config;

    Logger.authError("API Response error", {
      url: originalRequest?.url,
      status: err.response?.status,
      message: err.message,
    });

    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(err);
    }

    if (err.response?.status === StatusCodes.UNAUTHORIZED.code) {
      // Don't try to refresh for auth endpoints
      if (
        originalRequest.url?.includes("/auth/refresh-token") ||
        originalRequest.url?.includes("/auth/logout") ||
        originalRequest.url?.includes("/auth/login") ||
        originalRequest.url?.includes("/auth/signup")
      ) {
        Logger.authDebug("Skipping refresh for auth endpoint", {
          url: originalRequest.url,
        });
        return Promise.reject(err);
      }

      if (isRefreshing) {
        Logger.authDebug("Already refreshing, queuing request");

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
        Logger.authError("No refresh token available");
        isRefreshing = false;
        processQueue(err, null);
        return Promise.reject(err);
      }

      try {
        Logger.authInfo("Attempting token refresh");
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

        // save the new tokens
        tokenStore.saveTokens({
          accessToken,
          refreshToken: newRefreshToken,
          expiresAt,
        });

        // Update API default headers
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        Logger.authInfo("Token refresh successful");
        processQueue(null, accessToken);

        // Retry original request
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        Logger.authError("Token refresh failed", refreshError);

        processQueue(refreshError, null);
        tokenStore.clear();
        api.defaults.headers.common["Authorization"] = undefined;

        toast.error("Session Expired", {
          description: "Please login again.",
        });

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  },
);
