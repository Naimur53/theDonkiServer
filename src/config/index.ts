/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_secret_signup: process.env.JWT_REFRESH_SECRET_SIGNUP,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  emailUserPass: process.env.EMAIL_USER_PASS,
  emailUser: process.env.EMAIL_USER,
  mainAdminEmail: process.env.MAIN_ADMIN_EMAIL,
  mainAdminEmailPass: process.env.MAIN_ADMIN_EMAIL_PASS,
  mainLogo: process.env.MAIN_LOGO,

  openAiApi: process.env.OPEN_AI_API as string,
  openAiAssistant_id: process.env.OPEN_AI_ASSISTANT_ID as string,
  googleAi: process.env.GOOGLE_AI as string,

  captchaSiteKey: process.env.CAPTCHA_SITE_KEY,
  captchaSecretKey: process.env.CAPTCHA_SECRET_KEY,
};
