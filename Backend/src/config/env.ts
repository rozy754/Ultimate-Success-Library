import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.url(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES: z.string().default("15m"),
  REFRESH_TOKEN_EXPIRES: z.string().default("7d"),
  BCRYPT_SALT_ROUNDS: z.coerce.number().default(10),
  CORS_ORIGINS: z.string().default("http://localhost:5173,http://localhost:3000"),
  // New environment variables
  FRONTEND_URL: z.string().url(),
  BACKEND_URL: z.string().url(),
  EMAIL_FROM: z.string().email(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
});

const env = envSchema.parse(process.env);
(env as any).corsOrigins = env.CORS_ORIGINS.split(",").map(o => o.trim());
export default env;
