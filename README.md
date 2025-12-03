# LabLink-nest

Modular API project built with NestJS, TypeScript, and Drizzle ORM. Includes tools for development, testing, and integrated study workflows.

## 📁 Directory Structure

```
src/
├── main.ts                  # NestJS entrypoint
├── app.module.ts            # Main module
├── modules/
│   └── example/             # Example module
│       ├── example.controller.ts
│       ├── example.service.ts
│       ├── example.repo.ts
│       └── example.controller.spec.ts
├── infra/
│   └── db/
│       ├── schema.ts        # Drizzle schema definition
│       └── client.ts        # Database connection config
├── config/
│   └── env.ts               # Environment validation (Zod)
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
- **Obsidian Integration**: Sync and templates for study
- **Warp Workflows**: Terminal aliases and commands

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

Adapt variables for your environment (local, Docker, production) to ensure correct connection.
