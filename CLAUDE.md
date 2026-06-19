# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Group Expenses Manager (GEM) — a web app for managing shared group expenses. Microservices backend (Quarkus/Java 17) with a React frontend.

## Build & Test Commands

### Backend (API)

All commands run from `api/`:

```bash
# Build all services (commons must build first as a dependency)
mvn --batch-mode --update-snapshots verify

# Build a single service
cd api/transaction && ./mvnw quarkus:build

# Run a single service in dev mode (starts DevServices PostgreSQL automatically)
cd api/transaction && ./mvnw quarkus:dev

# Run unit tests for a single service
cd api/transaction && ./mvnw test

# Run integration tests (disabled by default, use -DskipITs=false)
cd api/transaction && ./mvnw verify -DskipITs=false

# Build native image
cd api/transaction && ./mvnw package -Dnative
```

Quarkus DevServices auto-provisions PostgreSQL (port 32779, postgres:15.2-alpine) — no manual DB setup needed for local dev.

### Frontend (UI)

All commands run from `ui/transaction/`:

```bash
npm install
npm start          # Dev server on port 3000 (auto-opens browser)
npm run build      # Production build to build/ dir
npm test           # Vitest (jsdom environment)
npm run test:coverage
```

The UI reads `VITE_API_ENDPOINT` from environment to locate the transaction API.

## Architecture

**Monorepo with two top-level modules:**

- `api/` — Maven multi-module project (parent POM at `api/pom.xml`)
- `ui/` — React apps (one per domain, currently only `ui/transaction/`)

### API Services

Each service is an independent Quarkus application with its own database and Dockerfile variants. They share `api/commons/` for DTOs.

| Service | Status | Path prefix | DB |
|---------|--------|-------------|-----|
| transaction | Active (full CRUD) | `/transaction` | PostgreSQL + Flyway |
| account | Scaffold only | `/account` | PostgreSQL |
| membership | Scaffold only | `/member` | PostgreSQL |
| invoice | Scaffold only | `/invoice` | PostgreSQL |

### Transaction service layers (the only fully implemented service)

```
Resource (JAX-RS) → Service → Repository (Panache) → Entity
                        ↕
                   TransactionMapper (MapStruct, CDI-managed)
                        ↕
              commons/dto/Transaction ↔ entity/Transaction
```

- **Reactive stack throughout**: Mutiny `Uni<>` return types, Hibernate Reactive Panache, RESTEasy Reactive
- **DTO/Entity separation**: `commons/dto/Transaction` (API contract) vs `entity/Transaction` (JPA), mapped via MapStruct
- **Pagination**: Custom `Paginated<T>` wrapper in commons (items + page + hasMore)
- **DB migrations**: Flyway, auto-runs at startup (`quarkus.flyway.migrate-at-start=true`). Migrations in `src/main/resources/db/migration/`

### Key tech stack

- **Backend**: Quarkus 3.8.3, Java 17, Hibernate Reactive Panache, RESTEasy Reactive, Flyway, MapStruct, SmallRye OpenAPI, Jib (container images)
- **Frontend**: React 18, Vite, Bootstrap 5, Vitest
- **Database**: PostgreSQL
- **Container images**: Built with Jib, pushed to `ghcr.io/davidesalerno/` on merge to main

## CI (GitHub Actions)

- `api-tests.yml` — runs `mvn verify` on push/PR touching `api/`
- `ui-tests.yml` — runs `npm install && npm test` for each UI app on push/PR touching `ui/`
- `api-merge.yml` — on merge to main: builds + pushes container images to GHCR

## Dev Environment

A devcontainer config (`.devcontainer/`) provides Java 21 + Node 22 + PostgreSQL via Docker Compose.
