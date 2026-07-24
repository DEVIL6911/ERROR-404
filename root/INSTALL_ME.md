# INSTALL_ME.md | Setup & Deployment Guide

This guide details step-by-step instructions for running the REEF platform locally, deploying to **Vercel**, and orchestrating with Docker Compose.

---

## 1. Local Quickstart (Zero External Dependencies)

Because the client includes a built-in static mock API engine (`useApi`), you can launch and test the full 3D Pop-Art UI immediately!

### Frontend Setup (Vite + React)
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 2. Deploying Frontend to Vercel

The monorepo includes a `root/vercel.json` and client fallback engine pre-configured for Vercel:

1. Connect your repository to **Vercel**.
2. Set **Root Directory** to `client`.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**!

---

## 3. Backend Setup (FastAPI + Async Database)

```bash
# Navigate to server directory
cd server

# Create Python virtual environment
python -m venv venv

# Activate virtual environment (Windows)
.\venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Run FastAPI server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

- API Base Endpoint: `http://localhost:8000/api/v1`
- OpenAPI Swagger Docs: `http://localhost:8000/docs`

---

## 4. Docker Compose Simulation

For a production environment running FastAPI, PostgreSQL 15, and Vite:

```bash
# Run multi-container stack from project root
docker-compose -f root/docker-compose.yml up --build
```
