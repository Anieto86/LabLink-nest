import { Global, Module } from "@nestjs/common";
import { APP_ENV, APP_PORT, DATABASE_URL_TOKEN } from "./config.constants";
import { DATABASE_URL, env, PORT } from "./env";

/**
 * Global Config module exposing validated environment values for DI.
 */
@Global()
@Module({
	providers: [
		{ provide: APP_ENV, useValue: env },
		{ provide: DATABASE_URL_TOKEN, useValue: DATABASE_URL },
		{ provide: APP_PORT, useValue: PORT },
	],
	exports: [APP_ENV, DATABASE_URL_TOKEN, APP_PORT],
})
export class ConfigModule {}
