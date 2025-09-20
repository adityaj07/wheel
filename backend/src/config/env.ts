import dotenv from "dotenv";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "3000",
  API_VERSION: process.env.API_VERSION || "v1",
  DATABASE_URL: process.env.DATABASE_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || "",
  JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY || "15 * 60",
  REFRESH_TOKEN_EXPIRY_DAYS:
    Number(process.env.REFRESH_TOKEN_EXPIRY_DAYS) || 30,
};
