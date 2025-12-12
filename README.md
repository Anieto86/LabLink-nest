# LabLink-nest

Modular API project built with NestJS, TypeScript, and Drizzle ORM. Includes tools for development, testing, and integrated study workflows.
Directory Structure
## 📁

```
src/
├── main.ts                  # NestJS entrypoint
├── app.module.ts            # Main module
├── modules/
│   └── equipment/           # Example module (full structure)
│       ├── equipment.controller.ts   # Controller
│       ├── equipment.service.ts      # Service
│       ├── equipment.repo.ts         # Repository
│       ├── equipment.mapper.ts       # Mapper
│       ├── dto/
│       │   └── equipment.dto.ts      # DTOs (Zod)
│       ├── entities/
│       │   └── equipment.entity.ts   # Entity definitions
│       ├── schema/
│       │   └── equipment.ts          # Drizzle table schema
├── module/
│   └── laboratory/          # Laboratory module
├── infra/
│   ├── db/                  # Drizzle schema and client
│   └── security/            # Hashing and security utils
├── config/
│   ├── env.ts               # Environment validation (Zod)
│   └── logger.ts            # Logger config
```

## 🚀 Quick Commands

```bash
pnpm start         # Start NestJS server
pnpm start:dev     # Hot reload
pnpm check         # Format, lint, typecheck
pnpm db:gen        # Generate migrations
pnpm db:migrate    # Apply migrations
pnpm db:studio     # Drizzle Studio GUI
pnpm test          # Run tests with Jest
```

## 🔧 Tools & Integrations

- **Biome**: Formatting, linting, import sorting
- **Jest**: Integrated testing with NestJS
- **Drizzle ORM**: Database access and migrations
- **Swagger**: API documentation and live testing (accede a `/api-docs` en el servidor)
- **Obsidian Integration**: Sync and templates for study
- **Warp Workflows**: Terminal aliases and commands


## 🗄️ Migrations & Schemas (Drizzle ORM)

This project uses **Drizzle ORM** to define the database structure and manage migrations in a safe and professional way.

### Schema Structure
- Drizzle schema files are located in `src/infra/db/schema/` and define tables, types, and relationships using TypeScript.
- Each module has its own schema file for modularity.
- The `src/infra/db/schema.ts` file centralizes and exports all schemas so Drizzle can detect them.

### Migration Workflow
1. **Modify or create schemas** in `src/infra/db/schema/`.
2. Run `pnpm db:gen` to generate a new SQL migration based on detected changes.
3. Review the generated file in `drizzle/migrations/` (optional, for quality control).
4. Run `pnpm db:migrate` to apply the migration to the database.
5. (Optional) Use `pnpm db:studio` to explore the database with Drizzle Studio.

### Syncing with an Existing Database
If your database already has tables created manually or by other systems, use:

```bash
pnpm drizzle-kit introspect
```

This will generate schemas based on the actual structure of your database, allowing you to synchronize and avoid duplication errors.

**Recommendation:** Always keep your schemas and migrations in sync to ensure database integrity and traceability.

---
## 📖 API Documentation

Swagger is integrated to visualize and test the API. Access the interactive documentation at:

```
http://localhost:3000/api-docs
```
when the server is running.

## 📚 Study & Sync Workflows

You can use external tools to enhance learning and project analysis:

- Sync the project with Obsidian using `npm run obsidian:sync` or `ll-sync`
- Use Obsidian templates for code analysis, flow tracing, study sessions, and architecture mapping
- Run Warp commands to automate study and sync tasks

## 📋 Available Templates

- **Code Analysis**: Deep dive into files
- **Code Flow Trace**: Track request/response flows
- **Learning Session**: Structured study sessions
- **Learning Game**: Gamified progress
- **Project Map**: Architecture mapping
- **Reverse Engineering**: Discovery-based learning

## 🎯 Benefits

- Automated sync between development and study environments
- Structured learning with templates
- Version-controlled notes alongside code
- Quick access to project context
- Visual connections in Obsidian

## Configuration

- Scripts and paths in `scripts/auto-sync-to-obsidian.sh`, `tools/warp-workflows/warp-commands.sh`, and `package.json`

## ⚡️ Drizzle ORM Configuration

Drizzle ORM configuration is in `drizzle.config.ts` and adapts the PostgreSQL connection for each environment:

- Uses environment variables (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) to build the URL if `DATABASE_URL` is not provided.
- If `DB_HOST` is `db`, resolves to `127.0.0.1` for easier local development outside Docker.
- Warns if `DATABASE_URL` is missing and uses the constructed URL.
- Database schema is in `src/infra/db/schema.ts`.
- Migrations are stored in `drizzle/migrations`.


### Useful Commands

```bash
pnpm db:gen        # Generate migrations from schema changes
pnpm db:migrate    # Apply migrations to the database
pnpm db:studio     # Open Drizzle Studio GUI
```

### Migration Scripts: Idempotency

Los scripts de migración están diseñados para ser idempotentes: usan bloques `IF NOT EXISTS` para crear tipos, tablas, índices y claves foráneas solo si no existen. Esto permite ejecutar las migraciones múltiples veces sin errores por duplicados.

Ejemplo:

```sql
DO $$
BEGIN
	IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
		CREATE TABLE "users" (...);
	END IF;
END
$$;
```

Esto asegura migraciones seguras y repetibles en cualquier entorno.

Adapt variables para tu entorno (local, Docker, producción) para asegurar la conexión correcta.
