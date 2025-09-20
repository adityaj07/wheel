export type NoParams = {};

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: number;
    details?: unknown;
  };
};
