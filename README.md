# Reputo 🚀

[![CI](https://github.com/behzad-rabiei/pnpm-workspace/actions/workflows/ci.yml/badge.svg)](https://github.com/behzad-rabiei/pnpm-workspace/actions/workflows/ci.yml)  
[![Docker](https://github.com/behzad-rabiei/pnpm-workspace/actions/workflows/docker-release.yml/badge.svg)](https://github.com/behzad-rabiei/pnpm-workspace/actions/workflows/docker-release.yml)  
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)  
[![Coverage Status](https://codecov.io/gh/behzad-rabiei/pnpm-workspace/branch/main/graph/badge.svg)](https://codecov.io/gh/behzad-rabiei/pnpm-workspace)

---

## ✨ What is Reputo?

**Reputo** is a privacy-preserving, modular reputation-and-voting platform inspired by Snapshot, designed for SingularityNET DAOs and the wider web-3 ecosystem.

- 🧩 **Highly customisable** – admins compose "Reputation Strategies" from pluggable data services, algorithms and weights.
- ⚡ **Scalable & reliable** – Temporal-orchestrated micro-services keep long-running jobs durable and auditable.
- 🛡️ **Privacy-first** – homomorphic encryption & ZK-proofs let anyone verify results without exposing raw personal data.
- 📝 **Compliant** – a consent dashboard lets community members grant or revoke data processing rights (GDPR-ready).

---

## 📚 Table of Contents

1. [🚀 Quick Start](#-quick-start)
2. [📁 Project Structure](#-project-structure)
3. [🧩 Apps & Packages](#-apps--packages)
4. [🛠️ Tooling & Conventions](#-tooling--conventions)
5. [🔑 Environment Variables](#-environment-variables)
6. [📦 Dependencies](#-dependencies)
7. [⏳ Temporal Workflows](#-temporal-workflows)
8. [📖 API Reference](#-api-reference)
9. [🧪 Testing](#-testing)
10. [🤝 Contributing](#-contributing)
11. [🛡️ Code of Conduct & Security](#-code-of-conduct--security)
12. [📄 License](#-license)
13. [🚢 Release Process](#-release-process)
14. [🏗️ Architecture](#-architecture)

---

## 🚀 Quick Start

### 🖥️ Local development (pnpm)

```bash
pnpm install      # install workspace deps
pnpm dev          # runs api, ui, workflows in parallel
```

> Requires **Node 20+** and **pnpm 10+**

### 🐳 Local development (Docker Compose)

```bash
docker compose up --build   # api :3000, ui :8080, temporal-web :8000
```

### ✅ One-liner sanity check

```bash
curl http://localhost:3000/healthz   # NestJS liveness probe
open http://localhost:8080           # React dashboard
```

## 📁 Project Structure

```
pnpm-workspace/
├── apps/
│   ├── api/
│   ├── ui/
│   └── workflows/
├── packages/
│   └── reputation-algorithms/
├── .github/
├── .changeset/
├── node_modules/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── biome.json
├── lefthook.yml
├── commitlint.config.mjs
├── vitest.config.ts
├── tsconfig.base.json
├── tsconfig.vitest.json
└── .gitignore
```

## 🧩 Apps & Packages

| 📂 Path                          | 🛠️ Stack                                                                                                                                                                             | 📝 Notes                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `apps/api`                       | ![nestjs](https://img.shields.io/badge/-NestJS-E0234E?logo=nestjs&logoColor=white&style=flat)                                                                                        | Swagger at `/api/docs`   |
| `apps/ui`                        | ![react](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black&style=flat) + ![vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white&style=flat) | Lightweight dashboard    |
| `apps/workflows`                 | ![typescript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat) + Temporal SDK                                                             | Durable background jobs  |
| `packages/reputation-algorithms` | ![typescript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat)                                                                            | Pure algorithms – no I/O |

## 🛠️ Tooling & Conventions

- 🏗️ **Monorepo**: pnpm workspaces
- 🧪 **Test runner**: Vitest (monorepo-wide)
- 🎨 **Lint/Format**: Biome
- 🪝 **Git hooks**: Lefthook → pre-commit = pnpm check, pre-push = pnpm check && pnpm test, commit-msg = Commitlint
- 🏷️ **Versioning**: Changesets → auto PRs
- 🐳 **Containers**: Docker & Docker Compose
- 🤖 **CI/CD**: GitHub Actions (ci.yml, docker-release.yml, changeset.yml)

## 🔑 Environment Variables

Create a `.env` in the repo root (or copy `.env.example`):

| Variable           | Purpose                      | Default (dev)                                    |
| ------------------ | ---------------------------- | ------------------------------------------------ |
| `DATABASE_URL`     | PostgreSQL connection string | `postgres://reputo:reputo@localhost:5432/reputo` |
| `TEMPORAL_ADDRESS` | Temporal gRPC host:port      | `localhost:7233`                                 |
| `JWT_SECRET`       | API auth signing key         | `changeme-in-prod`                               |
| `REDIS_URL`        | Redis connection (optional)  | `redis://localhost:6379`                         |

## 📦 Dependencies

| Service            | Version | Dev startup command                       |
| ------------------ | ------- | ----------------------------------------- |
| 🐘 PostgreSQL      | 16      | `docker compose up db`                    |
| ⏳ Temporal Server | 1.27    | `docker compose up temporal temporal-web` |
| 🟢 Redis (opt.)    | latest  | `docker compose up redis`                 |

## ⏳ Temporal Workflows

```bash
# start server & web UI (ports 7233 / 8000)
docker compose up temporal temporal-web

# run the worker
pnpm start:temporal
```

Browse [http://localhost:8000](http://localhost:8000) to watch executions. Worker code resides in `apps/workflows/`.

## 📖 API Reference

- **Swagger UI**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- **OpenAPI JSON**: [http://localhost:3000/api-json](http://localhost:3000/api-json)

Re-generate spec:

```bash
pnpm --filter @reputo/api run build
```

## 🧪 Testing

```bash
pnpm test --coverage
```

- 🧪 **Framework**: Vitest
- 🛡️ **Coverage gate**: ≥ 50% (lines & branches) – enforced in CI
- 🗂️ **Layout**: unit tests `*.spec.ts` adjacent to code; integration tests in `tests/` use Testcontainers!

## 🤝 Contributing

### 🌳 Branch strategy

We follow trunk-based development: feature branches fork from main, open a PR, and are squash-merged after review.

### 📝 Commit messages

Conventional Commits via Commitizen:

```text
feat(api): add reputation snapshot endpoint
fix(workflows): handle zero-balance edge case
```

### ✅ Pull-request checklist

- [ ] `pnpm check` and `pnpm test` succeed
- [ ] Coverage ≥ 50 %
- [ ] Docs & Swagger updated if endpoints changed
- [ ] At least one reviewer from @reputo/maintainers

## 🛡️ Code of Conduct & Security

This project adheres to the [Contributor Covenant v2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

Found a vulnerability? E-mail [security@reputo.dev](mailto:security@reputo.dev) – we reply within three business days.

## 📄 License

Released under the MIT License. See [LICENSE](LICENSE) for details.

## 🚢 Release Process

1. Merge PRs into main.
2. Workspace CI runs checks and build.
3. On success, Docker Release workflow pushes images to GHCR:

    ```bash
    ghcr.io/behzad-rabiei/pnpm-workspace/{api|ui|workflows}:latest
    ```

4. Changesets opens a release PR when version bumps are required.

## 🏗️ Architecture

```mermaid
flowchart LR
  subgraph Browser / User
    UI[React 19 App]
  end
  UI -->|REST / GraphQL| APIGW((API Gateway))
  APIGW --> NestAPI[NestJS API]
  NestAPI -->|gRPC| Temporal[Temporal Server]
  Temporal --> Worker[Workflows<br/>TypeScript]
  Worker -->|writes| Postgres[(PostgreSQL)]
  Worker -->|caches| Redis[(Redis)]
  style Temporal fill:#fafafa,stroke:#333,stroke-dasharray:5 5
```

## Team

| [![Cyrille Derche](https://github.com/cyri113.png?size=100)](https://github.com/cyri113) | [![Behzad Rabiei](https://github.com/Behzad-rabiei.png?size=100)](https://github.com/Behzad-rabiei) |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [Cyrille Derche](https://github.com/cyri113)                                             | [Behzad Rabiei](https://github.com/Behzad-rabiei)                                                   |
