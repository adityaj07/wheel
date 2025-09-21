import {MMKV} from "react-native-mmkv";

type SaveTokenParams = {
  accessToken: string;
  refreshToken: string;
  expiresAt?: string;
};

const storage = new MMKV({
  id: "wheel_app_storage",
  encryptionKey: process.env.MMKV_ENCRYPTION_KEY || "",
});

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";
const EXPIRES_AT = "accessExpiresAt";

export const tokenStore = {
  saveTokens: ({accessToken, refreshToken, expiresAt}: SaveTokenParams) => {
    storage.set(ACCESS_KEY, accessToken);
    storage.set(REFRESH_KEY, refreshToken);

    if (expiresAt) storage.set(EXPIRES_AT, expiresAt);
  },

  getAccessToken: () => storage.getString(ACCESS_KEY) ?? null,
  getRefreshToken: () => storage.getString(REFRESH_KEY) ?? null,
  getAccessExpiry: () => storage.getString(EXPIRES_AT) ?? null,
  clear: () => {
    storage.delete(ACCESS_KEY);
    storage.delete(REFRESH_KEY);
    storage.delete(EXPIRES_AT);
  },
};
