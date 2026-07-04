# Biomedical GraphRAG Frontend

Next.js 16 dashboard for the Biomedical GraphRAG system.

## Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)
- A running GraphRAG API backend reachable at `GRAPHRAG_API_URL` (`make run-api` from the backend repo)

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Create `.env.local` from the example:
```bash
cp .env.example .env.local
```

3. Edit `.env.local`:
```
GRAPHRAG_API_URL=http://localhost:8765
```

4. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Running with the Backend

From the project root, run in two terminals:

```bash
# Terminal 1: Start the GraphRAG API
make run-api

# Terminal 2: Start the frontend
make run-frontend
```

## Features

- Ask biomedical questions, get answers grounded in GraphRAG (Qdrant hybrid search + Neo4j graph enrichment)
- Streamed responses with a results panel (retrieved papers) and an execution trace
- Users provide their own OpenAI key, entered on load and kept only in the browser session
