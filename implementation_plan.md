# Implementation Plan - REEF | Ocean Conservation Platform

REEF is a high-performance, visually immersive ocean conservation platform. It bridges scientific research (papers, datasets, discussions) with a real-time interactive 3D underwater and surface ocean environment built with React Three Fiber (R3F) and FastAPI.

## User Review Required

> [!IMPORTANT]
> **3D Camera & Depth Hierarchy Rule**: Per project rules, background elements (ocean fog, procedural water grid, particle floor) will sit at $z = -5$, while primary interactive elements (Interactive Reef Pins, CTA nodes, active data cards) will sit closer to the camera at $z = 0$.
>
> **Database Configuration**: The FastAPI backend is configured to seamlessly support both PostgreSQL (via `asyncpg`) for production/docker deployment and an asynchronous SQLite database (`aiosqlite`) for zero-dependency immediate local development testing.

---

## Proposed Architectural Layout & Component Demarcation

```
d:\hack-ocean\
├── root/                       <-- Global project settings (CI/CD, Docker, Docs)
│   ├── .antigravity.config     <-- Antigravity IDE manifest
│   ├── docker-compose.yml      <-- Multi-container orchestrator
│   ├── READ_ME.md              <-- Core Overview & Glossary
│   ├── INSTALL_ME.md           <-- Setup & Deployment Guide
│   ├── CONTRIBUTE_ME.md        <-- Contribution & Branching Rules
│   ├── CODE_OF_CONDUCT.md      <-- Community Conduct Policy
│   └── LICENSE.md              <-- Project & Data License
├── client/                     <-- React 18 + Vite + Tailwind + R3F Monorepo App
│   ├── src/
│   │   ├── assets/             <-- Shader code, textures, icons
│   │   ├── components/
│   │   │   ├── ui/             <-- Glassmorphic Nav, Sidebar, Forum, Auth Modal, Impact Cards
│   │   │   └── ocean/          <-- R3F 3D Ocean Scene (Water Shader, Caustics, LOD, Deep Sea Particle Currents)
│   │   ├── hooks/              <-- custom hooks (useReefData, useAuth, useApi)
│   │   ├── store/              <-- Zustand state management
│   │   ├── utils/              <-- Shader utilities, 3D math
│   │   ├── App.jsx             <-- Layout manager & mode switcher
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/                     <-- FastAPI Async Application
│   ├── app/
│   │   ├── api/v1/             <-- API Endpoints (reef, research, forum, auth)
│   │   ├── core/               <-- Security (JWT), Database async session, Config
│   │   ├── models/             <-- SQLModel ORM entities
│   │   ├── schemas/            <-- Pydantic schemas
│   │   └── main.py             <-- FastAPI entrypoint & seed runner
│   ├── alembic/                <-- DB Migrations
│   ├── requirements.txt
│   └── .env.example
└── research/                   <-- Data samples & paper repository
    ├── paper_repository/       <-- Research paper abstracts & datasets
    └── data_samples/           <-- Seed JSON for global reefs & plastic currents
```

---

## Key Features & Proposed Implementation

### 1. 3D Ocean Component (`OceanScene.jsx` & R3F Shaders)
- **Water Surface & Caustics**: Custom vertex/fragment shader for dynamic ocean waves with specular highlights and caustics lighting effects.
- **Lighting & Atmospheric Sky**: Directional sun rays, underwater depth fog (`#001428`), and procedural sky dome.
- **Mode Switching (Surface vs. Deep Sea Plastic Current Flow)**:
  - Surface mode: Bright sunlit water, ocean surface mesh, interactive reef markers.
  - Deep-Sea Current mode: Triggered when exploring plastic pollution forum topics; camera dives into dark depth, rendering procedural 3D particle currents representing ocean plastic trajectory models.
- **Proximity Scale**: Interactive pins placed at $z = 0$; background ocean bed / fog placed at $z = -5$.
- **LOD Optimization**: Distance-based particle density scaling and frustum culling to guarantee 60 FPS performance.

### 2. Modern Glassmorphic UI (Tailwind CSS 3)
- **Navbar**: Live status metrics (Reef Health Index, Active Coral Restorations, Volunteer Count), Navigation tabs (3D Reef Globe, Research Papers, Forum, Volunteer Events), User Profile & JWT Login/Register trigger.
- **Interactive Impact Mapping Sidebar**: Displays detailed data on selected reef coordinates: restoration %, volunteer counts, real-time temperature, linked research papers, and "Join Restoration" CTA.
- **Immersive Research & Forum Panels**:
  - Filterable research paper repository with download/view modal.
  - Interactive discussion forum cards linked directly to 3D scene visual modes.

### 3. Asynchronous FastAPI Backend
- **Database Layer**: SQLModel ORM with `async/await` queries for non-blocking I/O.
- **Auth**: Passlib + JWT token generation for user registration, authentication, and role management.
- **Endpoints**:
  - `/api/v1/reef` - Global reef coordinates, status, restoration stats.
  - `/api/v1/research` - Research paper listings, PDF metadata, tags.
  - `/api/v1/forum` - Discussion topics, deep-sea visualization toggles, threaded comments.
  - `/api/v1/auth` - Login, signup, user profile.
- **OpenAPI / Swagger**: Auto-generated documentation served at `/docs`.

### 4. Mandatory Documentation Files (`root/`)
- `READ_ME.md`: Features project overview, architecture graph, glossary of "antigravity tech", and the explicit section `IDE: Built with Antigravity IDE`.
- `INSTALL_ME.md`: Comprehensive setup steps for Vite, Tailwind, FastAPI, PostgreSQL/SQLite, and Docker Compose.
- `CONTRIBUTE_ME.md`: Governance, PR workflows, research branch strategies (`research/{paper_id}`).
- `CODE_OF_CONDUCT.md`: Community standards.
- `LICENSE.md`: MIT license for open-source conservation platform.

---

## Verification Plan

### Automated & Build Verification
1. **Frontend**: Clean Vite build (`npm run build`) and ESLint check.
2. **Backend**: FastAPI startup, syntax verification, Pydantic schema validation, and endpoint health check (`/docs` & `/api/v1/health`).
3. **Monorepo Structure**: Verify exact file path layout matches spec requirement.

### Manual Verification
1. **3D Visual Interaction**: Test surface-to-deep-sea camera transitions and particle current simulation.
2. **Impact Mapping**: Click reef markers on the 3D map and verify real-time data fetch in the Tailwind sidebar.
3. **Auth Flow**: Test registration, JWT token storage, and protected forum posting.
