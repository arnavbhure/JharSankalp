# JharSankalp — Societal Challenge-to-Impact Exchange

An AI-powered platform that transforms locally observed societal challenges in Jharkhand into structured, validated innovation opportunities and connects them with the right combination of universities, industry, and government to create measurable impact.

**Problem Statement ID:** 26043  
**Organization:** Government of Jharkhand  
**Department:** Department of Higher & Technical Education

---

## Architecture

```
root/
├── client/          # React + Vite + TypeScript + Tailwind
├── server/          # Express + TypeScript + Prisma
├── shared/          # Shared types and enums
├── prisma/          # Database schema and migrations
├── docker/          # Docker Compose for local services
├── docs/            # Product documentation and PRD
└── scripts/         # Utility scripts
```

**Stack:** React · TypeScript · Vite · Tailwind CSS · Express · Prisma · PostgreSQL · Redis · BullMQ · MapLibre · Recharts

---

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL 16
- Redis 7
- Docker (optional, for running PostgreSQL and Redis)

### 1. Clone and Install

```bash
git clone <repo-url>
cd JharSankalp
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Start Database (Docker)

```bash
docker compose -f docker/docker-compose.dev.yml up -d
```

### 4. Run Migrations & Seed

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

### 5. Start Development

```bash
npm run dev
```

This starts both:

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:4000
- **Health:** http://localhost:4000/api/v1/health

### 6. Demo Accounts

All demo accounts use password: `password123`

| Role               | Email                          |
| ------------------ | ------------------------------ |
| Citizen            | citizen@demo.jharsankalp.in    |
| Government Officer | officer@demo.jharsankalp.in    |
| District Officer   | district@demo.jharsankalp.in   |
| State Admin        | stateadmin@demo.jharsankalp.in |
| University Admin   | uniadmin@demo.jharsankalp.in   |
| Faculty            | faculty@demo.jharsankalp.in    |
| Student            | student@demo.jharsankalp.in    |
| Industry           | industry@demo.jharsankalp.in   |
| Super Admin        | admin@demo.jharsankalp.in      |

---

## Commands

| Command               | Description                  |
| --------------------- | ---------------------------- |
| `npm run dev`         | Start both client and server |
| `npm run dev:client`  | Start frontend only          |
| `npm run dev:server`  | Start backend only           |
| `npm run build`       | Build all packages           |
| `npm run db:generate` | Generate Prisma client       |
| `npm run db:migrate`  | Run database migrations      |
| `npm run db:seed`     | Seed demo data               |
| `npm run db:studio`   | Open Prisma Studio           |
| `npm run db:reset`    | Reset database               |
| `npm run lint`        | Run ESLint                   |
| `npm run format`      | Format code with Prettier    |

---

## Design Principles

1. **Challenge, not complaint** — The central domain object is a structured societal Challenge
2. **AI recommends, humans decide** — AI provides analysis; government/experts make decisions
3. **Evidence over vanity** — All metrics must be evidence-backed
4. **Existing solution before reinvention** — Search for reusable solutions first
5. **Capability matching over name matching** — Match actual skills, labs, availability
6. **Impact must be defined before execution** — Impact Contract required before projects

---

## Implementation Phases

| Phase | Description                            | Status |
| ----- | -------------------------------------- | ------ |
| 1     | Foundation (repo, UI, backend, schema) | ✅     |
| 2     | Authentication + RBAC                  | ⬜     |
| 3     | Challenge lifecycle                    | ⬜     |
| 4     | AI challenge intelligence              | ⬜     |
| 5     | Semantic search + deduplication        | ⬜     |
| 6     | Capability graph + matching            | ⬜     |
| 7     | Commitments + consortium               | ⬜     |
| 8     | Impact contract + project lifecycle    | ⬜     |
| 9     | Pilot + impact verification            | ⬜     |
| 10    | Government analytics + mission         | ⬜     |
| 11    | Realtime + notifications               | ⬜     |
| 12    | SIH demo hardening + UX polish         | ⬜     |

---

## License

Private — Smart India Hackathon 2026
