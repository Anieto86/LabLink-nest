import { config } from "dotenv";
import type { Config } from "drizzle-kit";

config();

const dbHost = process.env.DB_HOST === "db" ? "127.0.0.1" : process.env.DB_HOST || "localhost"; // Resolve 'db' to '127.0.0.1' if not in a Docker network, otherwise default to 'localhost'
const dbPort = process.env.DB_PORT || "5432";
const dbUser = process.env.DB_USER || "postgres";
const dbPassword = process.env.DB_PASSWORD || "postgres";
const dbName = process.env.DB_NAME || "biotrack_db"; // Default DB name

const constructedDatabaseUrl =
	process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("@db:")
		? process.env.DATABASE_URL
		: `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const finalDatabaseUrl = process.env.DATABASE_URL || constructedDatabaseUrl;

if (!process.env.DATABASE_URL) {
	console.warn(
		"⚠️  DATABASE_URL not provided — using constructed URL from DB_* environment variables."
	);
}

console.log(`🔗 Database URL being used: ${finalDatabaseUrl}`);

export default {
	schema: "./src/infra/db/schema.ts",
	out: "./drizzle/migrations", // Carpeta de migraciones SQL (requerida por db:migrate y también para introspect)
	dialect: "postgresql",
	dbCredentials: {
		url: finalDatabaseUrl,
	},
	verbose: true,
	strict: true,
	// IMPORTANTE: 'introspect' genera schema.ts y relations.ts en 'out' (drizzle/migrations)
	// Para mantener schema en src/infra/db, debes mover manualmente tras introspect:
	// pnpm db:introspect && mv drizzle/migrations/{schema,relations}.ts src/infra/db/
	introspect: {
		casing: "camel", // Convierte nombres snake_case a camelCase
	},
} satisfies Config;
