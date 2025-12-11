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

## 📖 API Documentation

Swagger está integrado para visualizar y probar la API. Accede a la documentación interactiva en:

```
http://localhost:3000/api-docs
```
cuando el servidor esté en ejecución.

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
