# Argon

A Next.js application with TypeScript, tRPC, and PostgreSQL.

## Getting Started

```bash
git clone https://github.com/mashnoon33/aai
cd aai
yarn install
cp .env.example .env
./start-database.sh   # Start PostgreSQL in Docker
yarn db:push          # Push database schema changes
yarn db:ingest        # Ingest trials, generate embeddings
yarn dev              # Start development server (http://localhost:3000)
```

