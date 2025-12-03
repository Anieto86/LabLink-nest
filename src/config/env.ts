import { config } from "dotenv";
import { z } from 'zod';

config();

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

// Parse and validate environment variables at startup
// This will throw an error if validation fails, preventing app startup with invalid config
export const env = envSchema.parse(process.env);

// Build unified DATABASE_URL for Drizzle ORM and pg Pool
// Uses provided DATABASE_URL or constructs one from individual DB_* variables
export const DATABASE_URL =
	env.DATABASE_URL ||
	`postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;

// Export server port for Express application
export const PORT = env.PORT;
