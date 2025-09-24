import {env} from "@/config";
import Logger from "@/utils/Logger";
import {MMKV} from "react-native-mmkv";

type SaveTokenParams = {
  accessToken: string;
  refreshToken: string;
  expiresAt?: string;
};

const storage = new MMKV({
  id: "wheel_app_storage",
  encryptionKey: env.MMKV_ENCRYPTION_KEY || "",
});

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";
const EXPIRES_AT = "accessExpiresAt";

export const tokenStore = {
  saveTokens: ({accessToken, refreshToken, expiresAt}: SaveTokenParams) => {
    try {
      storage.set(ACCESS_KEY, accessToken);
      storage.set(REFRESH_KEY, refreshToken);
      if (expiresAt) storage.set(EXPIRES_AT, expiresAt);

      Logger.authDebug("Tokens saved successfully", {
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken,
        expiresAt,
      });
    } catch (error) {
      Logger.authError("Failed to save tokens", error);
      throw error;
    }
  },

  getAccessToken: (): string | null => {
    try {
      const token = storage.getString(ACCESS_KEY) ?? null;
      Logger.authDebug("Retrieved access token", {hasToken: !!token});
      return token;
    } catch (error) {
      Logger.authError("Failed to get access token", error);
      return null;
    }
  },

  getRefreshToken: (): string | null => {
    try {
      const token = storage.getString(REFRESH_KEY) ?? null;
      Logger.authDebug("Retrieved refresh token", {hasToken: !!token});
      return token;
    } catch (error) {
      Logger.authError("Failed to get refresh token", error);
      return null;
    }
  },

  getAccessExpiry: (): string | null => {
    try {
      return storage.getString(EXPIRES_AT) ?? null;
    } catch (error) {
      Logger.authError("Failed to get access expiry", error);
      return null;
    }
  },

  clear: () => {
    try {
      storage.delete(ACCESS_KEY);
      storage.delete(REFRESH_KEY);
      storage.delete(EXPIRES_AT);
      Logger.authInfo("Tokens cleared successfully");
    } catch (error) {
      Logger.authError("Failed to clear tokens", error);
    }
  },

  // Helper method to check if tokens exist
  hasTokens: (): boolean => {
    const accessToken = tokenStore.getAccessToken();
    const refreshToken = tokenStore.getRefreshToken();
    return !!(accessToken || refreshToken);
  },

  // Helper method to check if access token is expired
  isAccessTokenExpired: (): boolean => {
    const expiryString = tokenStore.getAccessExpiry();
    if (!expiryString) return true;

    try {
      const expiryDate = new Date(expiryString);
      const now = new Date();
      const isExpired = now >= expiryDate;

      Logger.authDebug("Access token expiry check", {
        expiryDate: expiryDate.toISOString(),
        now: now.toISOString(),
        isExpired,
      });

      return isExpired;
    } catch (error) {
      Logger.authError("Failed to check token expiry", error);
      return true; // Assume expired if we can't parse the date
    }
  },
};
