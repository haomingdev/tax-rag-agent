# Agentic RAG Tax Agent - MVP

This project is an MVP implementation of an Agentic RAG (Retrieval Augmented Generation) system tailored for answering Malaysian tax-related questions. It features a Next.js frontend and a NestJS backend, utilizing Weaviate as a vector database and Google's Gemini/Embedding models for RAG capabilities.

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (v20 recommended, v18.20.5 currently used in development)
-   pnpm (v9.7.1 or later)
-   Docker and Docker Compose (for the local development environment)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd tax-rag-agent
    ```

2.  **Install dependencies:**
    Run `pnpm install` from the root of the project. This will install dependencies for the root workspace and all sub-packages (`backend`, `frontend`, `packages/common`).
    ```bash
    pnpm install
    ```

## Running the Development Environment

To start all services (backend, frontend, Weaviate, Redis) for local development, run:

```bash
pnpm dev
```

This command uses `docker-compose up --build` to build the images (if they don't exist or Dockerfiles have changed) and start the containers.

-   Frontend (Next.js) will be available at [http://localhost:3000](http://localhost:3000)
-   Backend (NestJS) will be available at [http://localhost:3001](http://localhost:3001)
-   Weaviate will be available at [http://localhost:8080](http://localhost:8080)
-   Redis will be available at `localhost:6379`

To stop and remove the containers, networks, and volumes created by `up`:

```bash
pnpm dev:down
```

## Linting and Formatting

This project uses ESLint for linting and Prettier for code formatting.

-   **To run the linter:**
    ```bash
    pnpm lint
    ```
-   **To automatically format files:**
    ```bash
    pnpm format
    ```

It is recommended to integrate these tools with your IDE for a better development experience.

## Project Structure

This is a monorepo managed with pnpm workspaces. Key directories include:

-   `backend/`: Contains the NestJS application (API, worker, RAG service).
-   `frontend/`: Contains the Next.js application (App Router, Tailwind CSS, Shadcn UI).
-   `packages/common/`: For shared TypeScript types, libraries, or utilities between frontend and backend.
-   `doc/`: Contains project documentation (PRD, Tech Spec, FSD, Database schema, etc.).

## Contribution Guidelines

-   Please follow the rules and best practices outlined in the `.windsurfrules` file.
-   Ensure code is linted and formatted before committing (`pnpm lint` and `pnpm format`).
-   Write clear and concise commit messages.
-   Update relevant documentation if your changes affect a feature or system behavior.

---

This README provides a basic setup guide. Refer to the documents in the `doc/` folder for more detailed information on product requirements, technical specifications, and system design.
