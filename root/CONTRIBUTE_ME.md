# CONTRIBUTE_ME.md | Collaboration Protocols & Research Workflow

Thank you for contributing to **REEF | Ocean Conservation Platform**. We welcome research papers, 3D shader enhancements, and conservation datasets.

---

## Strict Branching Strategy

All contributions must follow this branching protocol:

- `main`: Production-ready release code deployed to Vercel and production APIs.
- `develop`: Staging branch for integrated feature testing.
- `research/{paper_id}`: Dedicated research paper branches (e.g., `research/paper-03-acoustic-calcification`).
- `feature/{feature_name}`: UI and 3D component features (e.g., `feature/3d-halftone-shader`).

---

## Submitting Research Papers

1. Format paper metadata according to the schema in `research/paper_repository/`.
2. Include DOI, PDF citations, and a comic-style summary callout.
3. Submit a Pull Request targeting the `develop` branch.

---

## Code Standards
- **Frontend**: Functional React components, Tailwind utility styling, React Three Fiber hooks.
- **Backend**: Strict Pydantic v2 type hints, SQLModel ORM models, async database operations.
