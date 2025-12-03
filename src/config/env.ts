import { z } from 'zod';

export const envSchema = z.object({
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.string().regex(/^\d+$/),
  DATABASE_URL: z.string().optional(),
  PORT: z.string().regex(/^\d+$/),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  SECRET_KEY: z.string().min(32),
  REFRESH_TOKEN_SECRET: z.string().min(32),
  ACCESS_TOKEN_EXPIRE_MINUTES: z.string().optional(),
  JWT_EXPIRES: z.string().optional(),
  JWT_ALG: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
});

export function validateEnv(env: NodeJS.ProcessEnv) {
  const result = envSchema.safeParse(env);
  if (!result.success) {
    console.error('❌ Invalid environment variables:', result.error.format());
    process.exit(1);
  }
  return result.data;
}
