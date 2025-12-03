# LabLink-nest

Proyecto API modular construido con NestJS, TypeScript y Drizzle ORM. Incluye herramientas para flujos de desarrollo, testing y estudio integrados.

## 📁 Estructura de Carpetas

```
src/
├── main.ts                  # Entrypoint NestJS
├── app.module.ts            # Módulo principal
├── modules/
│   └── example/             # Módulo de ejemplo
│       ├── example.controller.ts
│       ├── example.service.ts
│       ├── example.repo.ts
│       └── example.controller.spec.ts
├── infra/
│   └── db/
│       ├── schema.ts        # Definición de schema Drizzle
│       └── client.ts        # Configuración de conexión
├── config/
│   └── env.ts               # Validación de entorno (Zod)
```

## 🚀 Comandos Rápidos

```bash
pnpm start         # Inicia el servidor NestJS
pnpm start:dev     # Hot reload
pnpm check         # Formato, lint, typecheck
pnpm db:gen        # Genera migraciones
pnpm db:migrate    # Aplica migraciones
pnpm db:studio     # GUI Drizzle Studio
pnpm test          # Ejecuta tests con Jest
```

## 🔧 Herramientas y Integraciones

- **Biome**: Formato, lint, orden de imports
- **Jest**: Testing integrado con NestJS
- **Drizzle ORM**: Acceso y migración de base de datos
- **Obsidian Integration**: Sincronización y templates para estudio
- **Warp Workflows**: Alias y comandos para terminal

## 📚 Flujos de Estudio y Sincronización

Puedes usar las herramientas externas para potenciar el aprendizaje y análisis del proyecto:

- Sincroniza el proyecto con Obsidian usando `npm run obsidian:sync` o `ll-sync`
- Usa templates en Obsidian para análisis de código, trazas de flujo, sesiones de estudio y mapeo de arquitectura
- Ejecuta comandos Warp para automatizar tareas de estudio y sincronización

## 📋 Templates Disponibles

- **Code Analysis**: Análisis profundo de archivos
- **Code Flow Trace**: Seguimiento de flujos
- **Learning Session**: Sesiones estructuradas
- **Learning Game**: Progreso gamificado
- **Project Map**: Mapeo de arquitectura
- **Reverse Engineering**: Aprendizaje por descubrimiento

## 🎯 Beneficios

- Sincronización automática entre desarrollo y entorno de estudio
- Aprendizaje estructurado con templates
- Notas versionadas junto al código
- Acceso rápido al contexto del proyecto
- Visualización de conexiones en Obsidian

## Configuración

- Scripts y rutas en `scripts/auto-sync-to-obsidian.sh`, `tools/warp-workflows/warp-commands.sh`, y `package.json`

## ⚡️ Configuración de Drizzle ORM

La configuración de Drizzle ORM se encuentra en `drizzle.config.ts` y permite adaptar la conexión a PostgreSQL según el entorno:

- Usa variables de entorno (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) para construir la URL si no se provee `DATABASE_URL`.
- Si `DB_HOST` es `db`, se resuelve a `127.0.0.1` para facilitar el desarrollo local fuera de Docker.
- Muestra advertencia si no se encuentra `DATABASE_URL` y utiliza la URL construida.
- El schema de la base de datos está en `src/infra/db/schema.ts`.
- Las migraciones se guardan en `drizzle/migrations`.

### Ejemplo de variables de entorno

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/mi_db
# O bien:
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=biotrack_db
```

### Comandos útiles

```bash
pnpm db:gen        # Genera migraciones desde cambios en el schema
pnpm db:migrate    # Aplica migraciones a la base de datos
pnpm db:studio     # Abre Drizzle Studio GUI
```

Adapta las variables según tu entorno (local, Docker, producción) para asegurar la conexión correcta.
