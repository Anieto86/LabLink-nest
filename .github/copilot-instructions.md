# LabLink-nest – AI Coding Agent Instructions

## Architecture Overview

LabLink-nest is a modular Node.js API built with TypeScript, NestJS , and Drizzle ORM. It follows a strict layered architecture designed for maintainability, scalability y integración sencilla de nuevas funcionalidades. Los patrones y convenciones están adaptados a las mejores prácticas de NestJS, con módulos, controladores, servicios y repositorios claramente separados.

- **Presentation Layer**: `src/modules/*/controller.ts` – HTTP routes and request handling via NestJS controllers
- **Business Logic Layer**: `src/modules/*/service.ts` – Core business logic and validation (NestJS providers)
- **Data Access Layer**: `src/modules/*/repo.ts` – Database operations with Drizzle ORM
- **Infrastructure Layer**: `src/infra/` – External services, database, HTTP clients

## Key Development Patterns

### Module Structure

Cada feature sigue este patrón exacto en `src/modules/[feature]/`:

```
feature/
├── feature.controller.ts    # NestJS controller, request validation, route decorators
├── feature.service.ts       # Business logic, orchestration, validation (NestJS provider)
└── feature.repo.ts          # Database queries using Drizzle ORM
```

### Database with Drizzle ORM

- **Schema**: Define tablas en `src/infra/db/schema.ts` usando Drizzle
- **Client**: Conexión y config en `src/infra/db/client.ts`
- **Migrations**: `pnpm db:gen` para generar, `pnpm db:migrate` para aplicar
- **Type Safety**: Todas las queries son type-safe con TypeScript

### Configuration & Environment

- **Variables de entorno**: Definidas/validadas en `src/config/env.ts` (Zod)
- **Logger**: Pino logger en `src/config/logger.ts`
- **Database URL**: Cadena de conexión PostgreSQL en `.env`

### Error Handling & HTTP

- **Custom Errors**: `src/common/http/errors.ts` (clases base)
- **Response Handlers**: `src/common/http/handlers.ts`
- **HTTP Client**: Cliente basado en Undici en `src/infra/http/client.ts`

## Essential Commands

```bash
# Desarrollo
pnpm start         # Inicia el servidor NestJS
pnpm start:dev     # Hot reload
pnpm check         # Formato, lint, typecheck

# Base de datos
pnpm db:gen        # Genera migraciones
pnpm db:migrate    # Aplica migraciones
pnpm db:studio     # GUI Drizzle Studio

# Testing
pnpm test          # Ejecuta tests unitarios (Vitest)
pnpm test:watch    # Modo TDD
```

## Project-Specific Conventions

- **Biome**: Formato, lint, orden de imports (no ESLint/Prettier)
- **TypeScript estricto**: `noEmit` checks con `pnpm typecheck`
- **pnpm v10.11.0+** requerido
- **Seguridad**: Helmet (headers HTTP), CORS, Zod para validación
- **Dependencia de módulos**: Controller → Service → Repository (no saltar capas)
- **Inyección de dependencias**: Providers y repositorios vía DI de NestJS
- **No acceso directo a DB**: Siempre usar service/repo

## Implementation Guidelines

- Nuevos features: Crea módulo en `src/modules/[feature]/`, implementa repo → service → controller, registra el módulo en la app principal
- Cambios de schema: Edita `src/infra/db/schema.ts`, ejecuta `pnpm db:gen`, revisa SQL, aplica con `pnpm db:migrate`
- Testing: Unit tests para servicios/repos, E2E con Supertest en `src/test/e2e/`, mock/test DB

## Key Files Reference

- `src/main.ts` – Entrypoint NestJS
- `src/infra/db/schema.ts` – Definición de schema Drizzle
- `src/config/env.ts` – Validación de entorno
- `package.json` – Tipo ES module
- `drizzle.config.ts` – Configuración de migraciones

## OpenAPI Integration

- Documentación API en `src/openapi/openapi.json`
- Mantén el spec sincronizado con los controllers
- Considera generación automática desde los controllers
