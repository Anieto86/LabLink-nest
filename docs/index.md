# LabLink API & Project Docs

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Run tests
pnpm test

# Generate migrations
pnpm db:gen

# Apply migrations
pnpm db:migrate

# Drizzle GUI
pnpm db:studio
```

## 📖 API Endpoints
- **Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs) — Interactive documentation
- **Health Check**: [http://localhost:3000/health](http://localhost:3000/health)

## 🧩 Modular Architecture
- **NestJS + TypeScript + Drizzle ORM**
- **PostgreSQL** database
- **Layered structure:**
  - `schema` → `dto` → `mapper` → `repo` → `service` → `controller`
- **Idempotent migrations**: safe scripts for multiple executions
- **Integrated Swagger** for documentation and testing

## 📝 Development Guide
- [**Contributing**](CONTRIBUTING.md) — How to contribute to the project
- [**Feature Creation Flow**](obsidian-Lablink/Feature-Creation-Flow.md) — Checklist and module analysis
- [**Project Map**](obsidian-Lablink/Project Map Template.md) — Structure and layers

## 🔄 Sync & Templates
- Sync docs and templates with Obsidian using `docs/lablink-sync-obsidian.sh`
- Templates and guides in `docs/obsidian-Lablink/`

---
Questions? Check the documentation, templates, and the main README.
