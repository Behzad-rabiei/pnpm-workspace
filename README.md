# Reputo 🚀

[![CI](https://github.com/behzad-rabiei/pnpm-workspace/actions/workflows/main.yml/badge.svg)](https://github.com/behzad-rabiei/pnpm-workspace/actions/workflows/main.yml)  
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
5. [🌍 Environment Strategy](#-environment-strategy)
6. [🔑 Environment Variables](#-environment-variables)
7. [🐳 Docker & Infrastructure](#-docker--infrastructure)
8. [🧪 Testing](#-testing)
9. [🤝 Contributing](#-contributing)
10. [🚢 Deployment & Release Process](#-deployment--release-process)
11. [🏗️ Architecture](#-architecture)
12. [📄 License](#-license)

---

## 🚀 Quick Start

### 🖥️ Local development (pnpm)

```bash
pnpm install      # install workspace deps
pnpm dev          # runs api, ui, workflows in parallel
```

> Requires **Node 20+** and **pnpm 10+**

### 🐳 Local development (Docker Compose)

#### Full local stack with services

```bash
# Complete local environment with PostgreSQL, Redis, Temporal
docker compose -f docker/docker-compose.local.yml up --build

# Services available at:
# - API: http://localhost:3000
# - UI: http://localhost:8080
```

#### Production-like setup

```bash
# Staging/production environment setup
docker compose -f docker/docker-compose.yml up --build
```

### ✅ Quick health checks

```bash
# Local development
curl http://localhost:3000/healthz   # NestJS API health
open http://localhost:8080           # React UI

# Preview environment
curl https://api.${PULLPREVIEW_PUBLIC_DNS}/healthz
open https://${PULLPREVIEW_PUBLIC_DNS}
```

---

## 📁 Project Structure

```
pnpm-workspace/
├── apps/
│   ├── api/                 # NestJS API server
│   ├── ui/                  # React + Vite frontend
│   └── workflows/           # Temporal workflows
├── packages/
│   └── reputation-algorithms/  # Pure TypeScript algorithms
├── docker/
│   ├── docker-compose.yml              # Production/staging setup
│   ├── docker-compose.preview.yml      # Preview environment
│   ├── docker-compose.local.yml        # Local development with services
│   ├── Dockerfile                      # Multi-stage build
│   ├── traefik.yml                     # Reverse proxy config
│   └── .env                            # Environment template
├── .github/
│   └── workflows/           # CI/CD pipelines
├── coverage/                # Test coverage reports
├── node_modules/           # pnpm workspace dependencies
├── package.json            # Root workspace config
├── pnpm-workspace.yaml     # Workspace definition
├── biome.json             # Linting & formatting
├── lefthook.yml           # Git hooks
├── vitest.config.ts       # Test runner config
└── tsconfig.base.json     # Shared TypeScript config
```

---

## 🧩 Apps & Packages

| 📂 Path                          | 🛠️ Stack                                                                                                                                                                             | 📝 Notes                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `apps/api`                       | ![nestjs](https://img.shields.io/badge/-NestJS-E0234E?logo=nestjs&logoColor=white&style=flat)                                                                                        | REST API with health checks |
| `apps/ui`                        | ![react](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black&style=flat) + ![vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white&style=flat) | Single-page application     |
| `apps/workflows`                 | ![typescript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat)                                                                            | Durable background jobs     |
| `packages/reputation-algorithms` | ![typescript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat)                                                                            | Pure algorithms – no I/O    |

---

## 🛠️ Tooling & Conventions

- 🏗️ **Monorepo**: pnpm workspaces with workspace protocol
- 🧪 **Test runner**: Vitest (monorepo-wide coverage)
- 🎨 **Lint/Format**: Biome (replaces ESLint + Prettier)
- 🪝 **Git hooks**: Lefthook → pre-commit checks, commit-msg validation
- 🏷️ **Versioning**: Semantic Release with conventional commits
- 🐳 **Containers**: Multi-stage Docker builds + Traefik proxy
- 🔄 **CI/CD**: GitHub Actions with quality gates
- 🌿 **Branching**: GitHub Flow (feature branches → main)

---

## 🌍 Environment Strategy

We follow a three-tier deployment strategy:

### 🔍 Preview Environment (Pull Requests)

- **Trigger**: Adding `pullpreview` label to PRs
- **Infrastructure**: AWS Lightsail (auto-provisioned)
- **URL**: Dynamic subdomain via PullPreview
- **Cleanup**: Auto-expires after 24h or PR closure

### 🧪 Staging Environment

- **Trigger**: Merge to `main` branch
- **URL**:
    - UI: [staging.logid.xyz](https://staging.logid.xyz)
    - API: [api-staging.logid.xyz](https://api-staging.logid.xyz)
    - Traefik: [traefik-staging.logid.xyz/dashboard](https://traefik-staging.logid.xyz/dashboard)
- **Deployment**: Watchtower auto-pulls latest images

### 🚀 Production Environment

- **Trigger**: Manual workflow dispatch with commit SHA
- **URL**:
    - UI: [logid.xyz](https://logid.xyz)
    - API: [api.logid.xyz](https://api.logid.xyz)
    - Traefik: [traefik.logid.xyz/dashboard](https://traefik.logid.xyz/dashboard)
- **Process**: Promotes staging images with production tags

---

## 🔑 Environment Variables

### Docker Environment (.env)

Create a `.env` file in the `docker/` directory:

| Variable           | Purpose                         | Example                      |
| ------------------ | ------------------------------- | ---------------------------- |
| `UI_DOMAIN`        | Frontend domain                 | `staging.logid.xyz`          |
| `API_DOMAIN`       | Backend API domain              | `api-staging.logid.xyz`      |
| `TRAEFIK_DOMAIN`   | Traefik dashboard domain        | `traefik-staging.logid.xyz`  |
| `TRAEFIK_AUTH`     | Dashboard basic auth (htpasswd) | `admin:$2y$10$...`           |
| `IMAGE_TAG`        | Docker image tag                | `main-abc123` / `production` |
| `CF_DNS_API_TOKEN` | Cloudflare DNS API token        | `your-cloudflare-token`      |

### Development Environment

| Variable       | Purpose                      | Default (dev) |
| -------------- | ---------------------------- | ------------- |
| `PORT`         | API server port              | `3000`        |
| `DATABASE_URL` | PostgreSQL connection string | `postgres://  |

---

## 🐳 Docker & Infrastructure

### Multi-stage Dockerfile

Our `docker/Dockerfile` uses a multi-stage build process:

- **Base**: Node.js 20 with pnpm
- **Build**: Install deps, build all apps, deploy to isolated directories
- **Runtime**: Separate lightweight images for `api`, `ui`, and `workflows`

### Traefik Reverse Proxy

- **TLS**: Automatic HTTPS with Let's Encrypt (Cloudflare DNS challenge)
- **Routing**: Domain-based routing with middleware support
- **Dashboard**: Protected with basic authentication
- **Health checks**: Built-in health monitoring

### Container Registry

Images are published to GitHub Container Registry:

```
ghcr.io/behzad-rabiei/pnpm-workspace/api:${TAG}
ghcr.io/behzad-rabiei/pnpm-workspace/ui:${TAG}
ghcr.io/behzad-rabiei/pnpm-workspace/workflows:${TAG}
```

### Watchtower Auto-deployment

- Monitors for new images with matching tags
- Rolling restart strategy
- Cleanup of old images
- 60-second polling interval

---

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm ci:test

# Watch mode for development
pnpm test --watch
```

- 🧪 **Framework**: Vitest with SWC compilation
- 🛡️ **Coverage**: V8 coverage provider
- 🗂️ **Layout**: Tests adjacent to source files (`*.spec.ts`)
- 📊 **Reporting**: Coverage reports in `coverage/` directory

---

## 🤝 Contributing

### 🌿 Branching Strategy: GitHub Flow

1. **Create feature branch** from `main`

    ```bash
    git checkout -b feature/your-feature-name
    ```

2. **Make changes** with conventional commits

    ```bash
    git commit -m "feat(api): add user authentication endpoint"
    ```

3. **Open Pull Request** to `main`
    - Add `pullpreview` label for preview deployment
    - Ensure CI passes (quality gate + tests)
    - Request review from maintainers

4. **Merge** after approval (squash merge preferred)

### 📝 Commit Convention

We use [Conventional Commits](https://conventionalcommits.org/):

```
feat(scope): add new feature
fix(scope): bug fix
docs(scope): documentation update
style(scope): formatting changes
refactor(scope): code refactoring
test(scope): add or update tests
chore(scope): maintenance tasks
```

### ✅ Pull Request Checklist

- [ ] `pnpm check` passes (lint + format)
- [ ] `pnpm test` passes with adequate coverage
- [ ] Documentation updated if needed
- [ ] PR has descriptive title and body
- [ ] At least one reviewer approval

---

## 🚢 Deployment & Release Process

### Automated Staging Deployment

1. **Merge to main** → triggers quality gate
2. **Quality gate passes** → builds and pushes images
3. **Watchtower detects** new images → rolling deployment
4. **Verification** → staging environment updated

### Manual Production Promotion

1. **Verify staging** environment is stable
2. **Trigger promotion** workflow with commit SHA:
    ```bash
    gh workflow run promote-production.yml -f commit=abc123...
    ```
3. **Watchtower deployment** → production updated
4. **Health checks** → verify deployment success

### Image Tagging Strategy

- **Staging**: `latest` (auto-deployed from main branch)
- **Production**: `production` (promoted from staging)
- **Versioned**: `main-{commit-sha}` for specific releases

---

### Component Responsibilities

- **🔀 Traefik**: TLS termination, domain routing, load balancing
- **🖼️ UI**: React SPA served as static files
- **⚙️ API**: NestJS REST API with health checks
- **⏱️ Workflows**: Temporal-based background job processing
- **🐋 Watchtower**: Automated container updates
- **📦 GHCR**: Container image registry

---

## 📄 License

Released under the GPL-3.0 license.

---

## Team

| [![Cyrille Derche](https://github.com/cyri113.png?size=100)](https://github.com/cyri113) | [![Behzad Rabiei](https://github.com/Behzad-rabiei.png?size=100)](https://github.com/Behzad-rabiei) |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [Cyrille Derche](https://github.com/cyri113)                                             | [Behzad Rabiei](https://github.com/Behzad-rabiei)                                                   |
