# GitHub Collaboration Guide 🐙🪸

Welcome to the **REEF Ocean Conservation Platform** GitHub collaboration framework! This document establishes standard protocols for open-source contributors, scientific researchers, and software engineers working together on this monorepo.

---

## 🏗️ 1. Repository Structure & Branching Strategy

Our git flow follows strict branch isolation to ensure stability across 3D web features and backend API services:

```
           main (Vercel Production Deployment)
            ▲
            │ (Pull Requests with 2 Approvals + CI Pass)
            │
         develop (Staging & Integration Branch)
        ▲       ▲                  ▲
       /         \                  \
feature/...  research/{paper_id}   fix/...
```

### Branch Naming Conventions
- **Production Branch**: `main` (Only updated via tested PRs from `develop`).
- **Development Branch**: `develop` (Integration branch for all completed features).
- **Feature Branches**: `feature/<short-description>` (e.g. `feature/3d-halftone-shader`, `feature/speech-bubble-fx`).
- **Research Branches**: `research/<paper_id>` (e.g. `research/paper-01-micro-fragmentation`).
- **Bug Fix Branches**: `fix/<issue-number>-<short-description>` (e.g. `fix/404-reef-coordinate-marker`).

---

## 🚀 2. Step-by-Step GitHub Collaboration Workflow

### Step 1: Fork & Clone
1. Click **Fork** on the top right of the GitHub repository.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/hack-ocean.git
   cd hack-ocean
   ```
3. Add the main repository as `upstream`:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/hack-ocean.git
   ```

### Step 2: Create a Feature/Research Branch
```bash
git checkout develop
git pull upstream develop
git checkout -b feature/cool-3d-effect
```

### Step 3: Commit Message Standard
Follow Conventional Commits format:
- `feat(3d)`: Add custom caustics shader to surface ocean
- `fix(api)`: Resolve Pydantic v2 validation error on reef endpoint
- `docs(root)`: Update INSTALL_ME.md with Vercel deployment steps
- `research(data)`: Add 3D ocean current vector trajectory sample JSON

### Step 4: Submit a Pull Request (PR)
1. Push your branch to your fork:
   ```bash
   git push origin feature/cool-3d-effect
   ```
2. Open a Pull Request on GitHub targeting the **`develop`** branch of the main repository.
3. Fill out the PR template checklist:
   - [x] Tested locally with `npm run dev` or `uvicorn app.main:app`
   - [x] Verified `npm run build` succeeds cleanly
   - [x] Followed 3D proximity rules ($z = 0$ for interactive elements, $z = -5$ for background)

---

## 💬 3. Code Review & Discussion Etiquette

- **Respectful & Constructive**: Use GitHub Code Review inline suggestions.
- **Scientific Integrity**: When submitting research papers or ocean vector datasets in `research/`, provide DOI or peer-reviewed citations.
- **Fast Feedback**: Maintainers strive to review PRs within 24-48 hours.

---

## 🛠️ 4. Local Execution Reference

### Running Frontend (React + R3F + Tailwind)
```bash
cd client
npm install
npm run dev
```

### Running Backend (FastAPI + Async DB)
```bash
cd server
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Deploying Frontend to Vercel
1. Import the `client/` folder in Vercel.
2. Select **Vite** framework preset.
3. Build Command: `npm run build`, Output Directory: `dist`.
