# REEF | Ocean Conservation Platform 🪸⚡

REEF is an ocean conservation platform engineered with a high-impact **KABOOM! 90s Vintage Pop-Art & Neo-Brutalist Design System**. It fuses real-time interactive 3D ocean rendering (React Three Fiber) with an asynchronous FastAPI backend and scientific open data repositories.

---

## IDE: Built with Antigravity IDE

> [!IMPORTANT]
> **IDE**: Built with **Antigravity IDE**.
> 
> This monorepo project was designed, generated, and configured utilizing the Antigravity IDE agentic architecture, incorporating modern monorepo standards, R3F 3D depth-scaling heuristics, and Vercel deployment readiness.

---

## High-Level Architecture Diagram

```mermaid
graph TD
    User[User Browser]
    
    subgraph "Frontend Services (Vite + React 18 + R3F)"
        PopArtUI[KABOOM! Pop-Art UI (Tailwind CSS 3)]
        StateMgmt[State Engine (Zustand)]
        APIClient[API Client & Mock Engine (useApi)]
        ThreeJS[3D Ocean Component (R3F Shaders & Proximity Scale)]
    end
    
    subgraph "Backend API (FastAPI)"
        Routes[API Routes / Endpoints]
        AuthSvc[Authentication Service (JWT)]
        DBSvc[Database/ORM Service (SQLModel / SQLAlchemy 2.0)]
    end
    
    DB[(PostgreSQL / SQLite Async)]

    User -->|Views| PopArtUI
    PopArtUI -->|Uses| StateMgmt
    PopArtUI -->|Interacts| ThreeJS
    StateMgmt -->|Calls| APIClient
    APIClient -->|HTTP / JSON| Routes
    Routes -->|Verifies| AuthSvc
    Routes -->|Queries| DBSvc
    DBSvc -->|Async SQL| DB
```

---

## 3D Depth & Proximity Hierarchy Rule

Per the platform design specification:
- **Interactive Elements & CTAs** (Reef Pins, Speech Callouts, Action Badges): Positioned closer to the camera at **$z = 0.0$**.
- **Background & Environmental Elements** (Ocean bed, water plane, deep-sea particle flow): Positioned at **$z = -5.0$**.

---

## Glossary of Antigravity Tech

- **Antigravity IDE**: The advanced agentic development environment facilitating integrated monorepo construction across frontend, 3D graphics, and backend services.
- **Acoustic Fragmentation**: A micro-fragmentation technique using soundwave resonance to accelerate coral polyp calcification by 400%.
- **3D Hydrodynamic Vector Modeling**: Procedural particle currents simulating deep-sea plastic micro-debris transport corridors.
- **Neo-Brutalist Pop-Art Engine**: A styling paradigm featuring 4px solid black outlines, halftone dot overlays, high-contrast primary palettes, and retro speech bubbles.
