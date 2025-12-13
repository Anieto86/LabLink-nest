import { Global, Module } from "@nestjs/common";
import { db } from "./client";
import { DB_CLIENT } from "./db.constants";

/**
 * Global DB module providing the Drizzle client for DI.
 * Repositories can inject the DB_CLIENT token instead of importing the client directly.
 */
@Global()
@Module({
	providers: [{ provide: DB_CLIENT, useValue: db }],
	exports: [DB_CLIENT],
})
export class DbModule {}
