# AnimeVault - Anime Streaming Platform

A modern anime streaming platform built with Next.js 14, NestJS, and Prisma.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS
- **Backend**: NestJS, Prisma ORM
- **Database**: PostgreSQL (Neon)
- **Deployment**: Vercel (web), Render (api)

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

# Start database (needs DATABASE_URL in .env)
cd apps/api
pnpm prisma migrate dev
pnpm prisma db seed

# Start development servers
cd ../..
pnpm dev
```

### Access Points

- Web: http://localhost:3000
- API: http://localhost:3001

## Deployment

### 1. Database (Neon - Free)

1. Go to https://neon.tech
2. Create a project
3. Copy connection string to `DATABASE_URL`

### 2. API (Render - Free)

1. Go to https://render.com
2. Connect GitHub repo
3. Create Web Service from `apps/api`
4. Set environment variables:
   - `DATABASE_URL`: Your Neon URL
   - `NODE_ENV`: production
   - `CORS_ORIGIN`: Your Vercel URL

### 3. Frontend (Vercel - Free)

1. Go to https://vercel.com
2. Import GitHub repo
3. Set root directory to `apps/web`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your Render API URL

## Project Structure

```
anime-streaming-platform/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # NestJS backend
├── package.json      # Root package
├── pnpm-workspace.yaml
└── turbo.json
```

## Scripts

```bash
pnpm dev              # Start all apps
pnpm build            # Build all apps
pnpm lint             # Lint all apps
```

## License

MIT
