export type IRefreshTokenResponse = {
  accessToken: string;
};
export type ILogin = {
  email: string;
  password: string;
};
export type IAdminLogin = {
  email: string;
  password: string;
  opt: number;
};
export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
  otp?: number;
};
export type RecaptchaResponse = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  score?: number;
  'error-codes'?: string[];
};
export type ICaptchaPayload = {
  token: string;
};
