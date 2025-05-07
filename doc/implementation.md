# Agentic RAG Tax Agent - MVP Implementation Plan

This document outlines the phased, step-by-step implementation plan for the Agentic RAG Tax Agent MVP.

## Phase 0: Project Setup & Foundation

-   [X] **P0.1: Repository & Monorepo Setup**
    -   [X] P0.1.1: Initialize Git repository.
    -   [X] P0.1.2: Set up monorepo structure (e.g., using pnpm workspaces or similar).
        -   [X] P0.1.2.1: Create `backend/` directory.
        -   [X] P0.1.2.2: Create `frontend/` directory.
        -   [X] P0.1.2.3: Create `packages/common/` for shared types/libs.
-   [X] **P0.2: Core Dependencies & Tooling**
    -   [X] P0.2.1: Install Node.js (v20) and pnpm.
    -   [X] P0.2.2: Initialize `package.json` in root and sub-packages.
    -   [X] P0.2.3: Install backend core dependencies (NestJS 10, LangChain TS 0.2, Weaviate client, BullMQ).
    -   [X] P0.2.4: Install frontend core dependencies (Next.js 14, React 18, Tailwind CSS 3, Shadcn UI, SWR).
    -   [X] P0.2.5: Set up TypeScript strict mode across all packages.
    -   [X] P0.2.6: Configure ESLint and Prettier, integrate with IDE.
    -   [X] P0.2.7: Add basic `.gitignore` and `.prettierignore`.
-   [X] **P0.3: Local Development Environment (Docker)**
    -   [X] P0.3.1: Create `docker-compose.yml` for local development.
        -   [X] P0.3.1.1: Define service for NestJS backend.
        -   [X] P0.3.1.2: Define service for Next.js frontend.
        -   [X] P0.3.1.3: Define service for Weaviate 1.23.
        -   [X] P0.3.1.4: Define service for Redis (for BullMQ).
        -   [X] P0.3.1.5: (Optional for local dev) Define services for Loki & Grafana.
    -   [X] P0.3.2: Create Dockerfiles for backend and frontend services.
    -   [X] P0.3.3: Add `pnpm dev` script to start all services via `docker-compose up`.
-   [X] **P0.4: Project Guidelines & Documentation**
    -   [X] P0.4.1: Finalize and commit `.windsurfrules`.
    -   [X] P0.4.2: Ensure PRD, Tech Spec, DB Schema, FSD are up-to-date and accessible.
    -   [X] P0.4.3: Create `README.md` with setup and contribution guidelines.

## Phase 1: Backend - Core API & Weaviate Integration

-   [X] **P1.1: NestJS API Application Setup (`backend/apps/api`)**
    -   [X] P1.1.1: Generate NestJS application for the API gateway.
    -   [X] P1.1.2: Configure basic modules, controllers, services structure.
    -   [X] P1.1.3: Implement a basic health check endpoint (e.g., `GET /api/health`).
-   [X] **P1.2: Weaviate Schema & Client**
    -   [X] P1.2.1: Define Weaviate schema in `backend/schema/weaviate-schema.ts` (for `IngestJob`, `RawDoc`, `DocChunk`, `ChatInteraction` classes as per `database.md`).
    -   [X] P1.2.2: Create `pnpm schema:push` script to apply schema to Weaviate instance.
    -   [ ] P1.2.3: Implement Weaviate client singleton service in `backend/libs/db/weaviate.ts`.
        -   [ ] P1.2.3.1: Write Jest unit tests for the Weaviate client service.
        -   [ ] P1.2.3.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P1.2.4: Implement schema creation/validation logic on backend startup.
        -   [ ] P1.2.4.1: Write Jest unit tests for schema creation/validation logic.
        -   [ ] P1.2.4.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] **P1.2.T: Testing & Verification (as per .windsurfrules)**
        -   [ ] P1.2.T.1: Unit tests written/updated (`pnpm test`) – target 80 % coverage.
        -   [ ] P1.2.T.2: Local run (`pnpm dev`) shows no console/server errors.
        -   [ ] P1.2.T.3: Weaviate schema diff applied successfully.
        -   [ ] P1.2.T.4: Logs in Loki show no `error` level entries.
        -   [ ] P1.2.T.5: Ask user to validate in staging and give “👍 Looks good”.
-   [ ] **P1.3: Shared Types**
    -   [ ] P1.3.1: Define core DTOs and entity types in `packages/common/src/types`.
        -   [ ] P1.3.1.1: (If applicable) Write Jest unit tests for any complex type validation/transformation logic.
        -   [ ] P1.3.1.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] **P1.3.T: Testing & Verification (as per .windsurfrules)**
        -   [ ] P1.3.T.1: Unit tests written/updated (`pnpm test`).
        -   [ ] P1.3.T.2: Local run (`pnpm dev`) shows no console/server errors.
        -   [ ] P1.3.T.3: Ask user to validate in staging and give “👍 Looks good”.

## Phase 2: Backend - Ingestion Worker (`COMP-WORK-001`)

-   [ ] **P2.1: NestJS Worker Application Setup (`backend/apps/worker`)**
    -   [ ] P2.1.1: Generate NestJS application for the ingestion worker.
    -   [ ] P2.1.2: Configure BullMQ module with Redis connection.
        -   [ ] P2.1.2.1: Write Jest unit tests for BullMQ configuration and connection logic.
        -   [ ] P2.1.2.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P2.1.3: Define ingestion queue and processor(s).
        -   [ ] P2.1.3.1: Write Jest unit tests for queue definition and basic processor structure.
        -   [ ] P2.1.3.2: Run `pnpm test` to ensure unit tests pass.
-   [ ] **P2.2: Ingestion Job Management**
    -   [ ] P2.2.1: Implement DTOs for `POST /api/ingest` request.
    -   [ ] P2.2.2: Implement `POST /api/ingest` endpoint in API app to validate input and enqueue job to BullMQ.
        -   [ ] P2.2.2.1: Write Jest unit tests for DTO validation and job enqueuing logic.
        -   [ ] P2.2.2.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P2.2.3: Implement logic in worker to update `IngestJob.status` in Weaviate (`pending`, `processing`, `completed`, `failed`).
        -   [ ] P2.2.3.1: Write Jest unit tests for `IngestJob.status` update logic.
        -   [ ] P2.2.3.2: Run `pnpm test` to ensure unit tests pass.
-   [ ] **P2.3: Document Fetching & Parsing**
    -   [ ] P2.3.1: Integrate Playwright for fetching and rendering web page content.
        -   [ ] P2.3.1.1: Write Jest unit tests for basic Playwright integration (mocking actual page fetches).
        -   [ ] P2.3.1.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P2.3.2: Integrate `article-extractor` (or similar) for main content extraction from HTML.
        -   [ ] P2.3.2.1: Write Jest unit tests for `article-extractor` integration.
        -   [ ] P2.3.2.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P2.3.3: Integrate `pdf-parse` for extracting text from PDF files.
        -   [ ] P2.3.3.1: Write Jest unit tests for `pdf-parse` integration.
        -   [ ] P2.3.3.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P2.3.4: Implement logic to differentiate URL types (web page vs. PDF link).
        -   [ ] P2.3.4.1: Write Jest unit tests for URL type differentiation logic.
        -   [ ] P2.3.4.2: Run `pnpm test` to ensure unit tests pass.
-   [ ] **P2.4: Text Chunking**
    -   [ ] P2.4.1: Implement text chunking logic (approx. 700-1000 tokens, 100-200 token overlap).
        -   [ ] P2.4.1.1: Write Jest unit tests for text chunking logic.
        -   [ ] P2.4.1.2: Run `pnpm test` to ensure unit tests pass.
-   [ ] **P2.5: Embedding Generation**
    -   [ ] P2.5.1: Set up Google Vertex AI client for Text Embedding 004.
        -   [ ] P2.5.1.1: Write Jest unit tests for Vertex AI client setup (mocking API calls).
        -   [ ] P2.5.1.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P2.5.2: Implement embedding generation for text chunks (batching up to 32 chunks per API call).
        -   [ ] P2.5.2.1: Write Jest unit tests for embedding generation and batching logic.
        -   [ ] P2.5.2.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P2.5.3: Implement retry mechanism for Vertex AI API calls (e.g., on 429 errors).
        -   [ ] P2.5.3.1: Write Jest unit tests for retry mechanism.
        -   [ ] P2.5.3.2: Run `pnpm test` to ensure unit tests pass.
-   [ ] **P2.6: Weaviate Upsert**
    -   [ ] P2.6.1: Implement logic to upsert `RawDoc` and `DocChunk` objects (with embeddings) to Weaviate.
        -   [ ] P2.6.1.1: Write Jest unit tests for Weaviate upsert logic.
        -   [ ] P2.6.1.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P2.6.2: Implement batching for Weaviate upserts (e.g., 100 objects per batch).
        -   [ ] P2.6.2.1: Write Jest unit tests for Weaviate batching logic.
        -   [ ] P2.6.2.2: Run `pnpm test` to ensure unit tests pass.
-   [ ] **P2.7: Error Handling in Worker**
    -   [ ] P2.7.1: Implement robust error handling throughout the ingestion pipeline.
        -   [ ] P2.7.1.1: Write Jest unit tests for error handling mechanisms.
        -   [ ] P2.7.1.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P2.7.2: Ensure `IngestJob.errorMessage` is populated on failure.
        -   [ ] P2.7.2.1: Write Jest unit tests to verify `IngestJob.errorMessage` population.
        -   [ ] P2.7.2.2: Run `pnpm test` to ensure unit tests pass.
-   [ ] **P2.T: Testing & Verification (as per .windsurfrules)**
    -   [ ] P2.T.1: Unit tests written/updated (`pnpm test`) – target 80 % coverage.
    -   [ ] P2.T.2: E2E happy-path (`pnpm e2e`) for ingestion passes.
    -   [ ] P2.T.3: Local run (`pnpm dev`) shows no console/server errors.
    -   [ ] P2.T.4: Weaviate schema diff applied successfully.
    -   [ ] P2.T.5: Logs in Loki show no `error` level entries.
    -   [ ] P2.T.6: Ask user to validate in staging and give “👍 Looks good”.

## Phase 3: Backend - RAG Service & Chat API (`COMP-RAG-001`)

-   [ ] **P3.1: LangChain RAG Service Setup (`backend/libs/rag`)**
    -   [ ] P3.1.1: Initialize LangChain TS components.
    -   [ ] P3.1.2: Set up Google Vertex AI client for Gemini 2.5-pro.
        -   [ ] P3.1.2.1: Write Jest unit tests for Gemini client setup (mocking API calls).
        -   [ ] P3.1.2.2: Run `pnpm test` to ensure unit tests pass.
-   [ ] **P3.2: RAG Pipeline Implementation**
    -   [ ] P3.2.1: Implement user query embedding (using Google Text Embedding 004).
        -   [ ] P3.2.1.1: Write Jest unit tests for query embedding logic.
        -   [ ] P3.2.1.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P3.2.2: Implement Weaviate `nearVector` search for relevant `DocChunk`s (topK=8, score ≥ 0.15).
        -   [ ] P3.2.2.1: Write Jest unit tests for Weaviate search logic.
        -   [ ] P3.2.2.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P3.2.3: Implement prompt templating/construction for Gemini, including retrieved context.
        -   [ ] P3.2.3.1: Write Jest unit tests for prompt templating.
        -   [ ] P3.2.3.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P3.2.4: Integrate LangChain `RetrievalQA` chain (or equivalent custom chain) with Gemini for answer generation.
        -   [ ] P3.2.4.1: Write Jest unit tests for `RetrievalQA` chain integration and answer generation.
        -   [ ] P3.2.4.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P3.2.5: Ensure total prompt token count is managed (≤ 4000 tokens).
        -   [ ] P3.2.5.1: Write Jest unit tests for token count management logic.
        -   [ ] P3.2.5.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P3.2.6: Implement logic for citation generation (linking answers to source `DocChunk`s).
        -   [ ] P3.2.6.1: Write Jest unit tests for citation generation logic.
        -   [ ] P3.2.6.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P3.2.7: Implement fallback mechanism if no relevant chunks found or if LLM fails to generate a suitable answer.
        -   [ ] P3.2.7.1: Write Jest unit tests for fallback mechanism.
        -   [ ] P3.2.7.2: Run `pnpm test` to ensure unit tests pass.
-   [ ] **P3.3: Chat API Endpoint (`POST /api/chat`)**
    -   [ ] P3.3.1: Implement DTOs and validation for chat requests (prompt length 1-512).
    -   [ ] P3.3.2: Implement `POST /api/chat` endpoint in API app using Server-Sent Events (SSE) for streaming responses.
        -   [ ] P3.3.2.1: Write Jest unit tests for DTO validation and SSE streaming logic.
        -   [ ] P3.3.2.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P3.3.3: Integrate RAG pipeline with the chat endpoint.
        -   [ ] P3.3.3.1: Write Jest unit tests for RAG pipeline integration.
        -   [ ] P3.3.3.2: Run `pnpm test` to ensure unit tests pass.
-   [ ] **P3.4: Chat Interaction Logging**
    -   [ ] P3.4.1: Implement logic to log chat interactions (prompt, answer, citations, timestamp) to Weaviate `ChatInteraction` class.
        -   [ ] P3.4.1.1: Write Jest unit tests for chat interaction logging logic.
        -   [ ] P3.4.1.2: Run `pnpm test` to ensure unit tests pass.
-   [ ] **P3.T: Testing & Verification (as per .windsurfrules)**
    -   [ ] P3.T.1: Unit tests written/updated (`pnpm test`) – target 80 % coverage.
    -   [ ] P3.T.2: E2E happy-path (`pnpm e2e`) for chat passes.
    -   [ ] P3.T.3: Local run (`pnpm dev`) shows no console/server errors.
    -   [ ] P3.T.4: Weaviate schema diff applied successfully.
    -   [ ] P3.T.5: Logs in Loki show no `error` level entries.
    -   [ ] P3.T.6: Ask user to validate in staging and give “👍 Looks good”.

## Phase 4: Frontend - Basic Structure & UI Components

-   [ ] **P4.1: Next.js App Router Setup**
    -   [ ] P4.1.1: Configure basic routing structure in `frontend/app/`.
    -   [ ] P4.1.2: Implement main layout component(s).
        -   [ ] P4.1.2.1: Write Jest/RTL unit tests for layout components.
        -   [ ] P4.1.2.2: Run `pnpm test` to ensure unit tests pass.
-   [ ] **P4.2: Styling and UI Primitives**
    -   [ ] P4.2.1: Set up Tailwind CSS configuration, including design tokens (DL-002).
    -   [ ] P4.2.2: Integrate Shadcn UI and import necessary primitives.
-   [ ] **P4.3: Shared Frontend Libraries/Hooks**
    -   [ ] P4.3.1: Create `apiClient.ts` using SWR for backend API communication.
        -   [ ] P4.3.1.1: Write Jest unit tests for `apiClient.ts` (mocking fetch/SWR).
        -   [ ] P4.3.1.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P4.3.2: Implement `useIsMobile.ts` hook (if needed for responsive design).
        -   [ ] P4.3.2.1: Write Jest unit tests for `useIsMobile.ts` hook.
        -   [ ] P4.3.2.2: Run `pnpm test` to ensure unit tests pass.
-   [ ] **P4.4: Core UI Components**
    -   [ ] P4.4.1: Develop common UI components (e.g., `Button`, `Input`, `Card`, `Modal`, `Toast/Notification`).
        -   [ ] P4.4.1.1: Write Jest/RTL unit tests for each core UI component.
        -   [ ] P4.4.1.2: Run `pnpm test` to ensure unit tests pass.
-   [ ] **P4.T: Testing & Verification (as per .windsurfrules)**
    -   [ ] P4.T.1: Unit tests written/updated (`pnpm test`) – target 80 % coverage for components.
    -   [ ] P4.T.2: Local run (`pnpm dev`) shows no console/server errors.
    -   [ ] P4.T.3: Ask user to validate in staging and give “👍 Looks good”.

## Phase 5: Frontend - Developer Ingestion Page (`FEAT-001`)

-   [ ] **P5.1: Ingestion Page UI (`frontend/app/ingest/page.tsx`)**
    -   [ ] P5.1.1: Create the main page component for developer ingestion.
        -   [ ] P5.1.1.1: Write Jest/RTL unit tests for the main ingestion page component.
        -   [ ] P5.1.1.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P5.1.2: Develop `IngestForm` component:
        -   [ ] P5.1.2.1: Input field for URL.
        -   [ ] P5.1.2.2: (If supporting direct PDF upload) File input for PDF.
        -   [ ] P5.1.2.3: Submit button.
        -   [ ] P5.1.2.4: Write Jest/RTL unit tests for `IngestForm` component.
        -   [ ] P5.1.2.5: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P5.1.3: Integrate `apiClient.ts` to call `POST /api/ingest`.
    -   [ ] P5.1.4: Implement UI feedback for ingestion status (e.g., loading indicators, success/error toasts).
-   [ ] **P5.2: Ingested Documents List & Management (`FUNC-008`)**
    -   [ ] P5.2.1: Implement `GET /api/docs` endpoint in backend API to list ingested `RawDoc` metadata from Weaviate.
        -   [ ] P5.2.1.1: Write Jest unit tests for `GET /api/docs` endpoint.
        -   [ ] P5.2.1.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P5.2.2: Develop `IngestTable` component on frontend to display list of ingested documents.
        -   [ ] P5.2.2.1: Display metadata like title, source URL, status, ingestion date.
        -   [ ] P5.2.2.2: Include a delete action for each document.
        -   [ ] P5.2.2.3: Write Jest/RTL unit tests for `IngestTable` component.
        -   [ ] P5.2.2.4: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P5.2.3: Implement `DELETE /api/docs/{docId}` endpoint in backend API to remove `RawDoc` and associated `DocChunk`s from Weaviate.
        -   [ ] P5.2.3.1: Write Jest unit tests for `DELETE /api/docs/{docId}` endpoint.
        -   [ ] P5.2.3.2: Run `pnpm test` to ensure unit tests pass.
    -   [ ] P5.2.4: Connect delete action in `IngestTable` to the `DELETE /api/docs/{docId}` API.
-   [ ] **P5.T: Testing & Verification (as per .windsurfrules)**
    -   [ ] P5.T.1: Unit tests written/updated (`pnpm test`) – target 80 % coverage.
    -   [ ] P5.T.2: E2E happy-path (`pnpm e2e`) for ingestion page functionality passes.
    -   [ ] P5.T.3: Local run (`pnpm dev`) shows no console/server errors.
    -   [ ] P5.T.4: Ask user to validate in staging and give “👍 Looks good”.

## Phase 6: Frontend - Public Chatbot Interface (`FEAT-002`)

-   [ ] **P6.1: Chat Page UI (`frontend/app/chat/page.tsx` or `/page.tsx`)**
    -   [ ] P6.1.1: Create the main page component for the public chatbot.
    -   [ ] P6.1.2: Develop `ChatInput` component for users to type their questions.
    -   [ ] P6.1.3: Develop `ChatMessage` component to display user queries and AI responses.
    -   [ ] P6.1.4: Implement state management for chat history.
-   [ ] **P6.2: Chat API Integration**
    -   [ ] P6.2.1: Integrate `apiClient.ts` to call `POST /api/chat`.
    -   [ ] P6.2.2: Implement SSE handling on the client-side to receive and display streaming AI responses.
    -   [ ] P6.2.3: Display typing indicators while waiting for AI response.
-   [ ] **P6.3: Citation Rendering**
    -   [ ] P6.3.1: Implement `highlight-citations.tsx` helper (or similar logic) to parse markdown and render clickable footnote-style citations.
-   [ ] **P6.4: Feedback Mechanism**
    -   [ ] P6.4.1: Add "Helpful?" (thumbs up/down) UI elements to each AI response.
    -   [ ] P6.4.2: Implement backend endpoint (e.g., `POST /api/feedback`) to record feedback.
    -   [ ] P6.4.3: Connect frontend feedback UI to the backend endpoint.
    -   [ ] P6.4.4: Store feedback data (linking to `ChatInteraction.chatId`).

## Phase 7: Logging, Monitoring & Analytics

-   [ ] **P7.1: Backend Logging (`FUNC-009`)**
    -   [ ] P7.1.1: Configure Winston for structured JSON logging in NestJS backend applications (API and Worker).
    -   [ ] P7.1.2: Ensure logs include timestamps, levels, service names, request IDs (if applicable), and relevant context.
    -   [ ] P7.1.3: Implement log rotation (e.g., daily) if not handled by deployment environment.
-   [ ] **P7.2: Feedback Analytics (`FEAT-004`)**
    -   [ ] P7.2.1: Design data structure for storing feedback effectively (e.g., in Weaviate `ChatInteraction` or separate table/collection).
    -   [ ] P7.2.2: Implement a secure backend endpoint to export feedback data as CSV.
-   [ ] **P7.3: (Optional) Frontend Log Dashboard (`FUNC-010`)**
    -   [ ] P7.3.1: If time permits, design and implement a simple frontend interface to view and filter server logs (requires backend endpoint to serve logs).
-   [ ] **P7.4: Basic Monitoring Setup (for Prod)**
    -   [ ] P7.4.1: Integrate OpenTelemetry for basic tracing in backend services.
    -   [ ] P7.4.2: (Prod) Configure log shipping from Cloud Run/VM to Grafana Loki.
    -   [ ] P7.4.3: (Prod) Set up basic Grafana dashboards for monitoring key metrics (e.g., request rates, error rates, latency).

## Phase 8: Testing & Non-Functional Requirements (NFRs)

-   [ ] **P8.1: Unit Testing**
    -   [ ] P8.1.1: Set up Jest (or preferred testing framework) for backend and frontend.
    -   [ ] P8.1.2: Write unit tests for critical backend services, utilities, and RAG pipeline components (target 80% coverage).
    -   [ ] P8.1.3: Write unit tests for key frontend components and utility functions.
-   [ ] **P8.2: End-to-End (E2E) Testing**
    -   [ ] P8.2.1: Set up Playwright for E2E testing.
    -   [ ] P8.2.2: Write E2E tests for core user flows:
        -   [ ] P8.2.2.1: Successful document ingestion (URL and/or PDF).
        -   [ ] P8.2.2.2: Successful chat interaction with citation.
        -   [ ] P8.2.2.3: Fallback message on no relevant context.
-   [ ] **P8.3: Security Hardening (as per `.windsurfrules` and specs)**
    -   [ ] P8.3.1: Ensure HTTPS is enforced in production.
    -   [ ] P8.3.2: Implement and test rate limiting on `/api/ingest` (10 req/min/IP).
    -   [ ] P8.3.3: Configure strict CORS policies.
    -   [ ] P8.3.4: Sanitize all user inputs on backend and frontend where applicable.
    -   [ ] P8.3.5: Set up Dependabot (or similar) for automated dependency vulnerability scanning.
    -   [ ] P8.3.6: Review and ensure no PII is unnecessarily stored or logged; IP logs anonymized/redacted.
-   [ ] **P8.4: Performance Optimization**
    -   [ ] P8.4.1: Benchmark chat response latency (target p95 < 2s).
    -   [ ] P8.4.2: Optimize Weaviate queries and indexing (HNSW parameters if needed).
    -   [ ] P8.4.3: Review LLM interaction for potential bottlenecks.
    -   [ ] P8.4.4: Analyze and optimize frontend bundle size and rendering performance.
    -   [ ] P8.4.5: Monitor and optimize average answer cost (target ≤ USD 0.002).
-   [ ] **P8.5: Accessibility (WCAG 2.1 AA)**
    -   [ ] P8.5.1: Conduct accessibility audit of frontend UI.
    -   [ ] P8.5.2: Remediate identified accessibility issues (semantic HTML, ARIA attributes, keyboard navigation, color contrast).

## Phase 9: Deployment & Documentation

-   [ ] **P9.1: Production Deployment Infrastructure (Terraform)**
    -   [ ] P9.1.1: Write Terraform scripts for GCP resources:
        -   [ ] P9.1.1.1: Cloud Run for NestJS backend.
        -   [ ] P9.1.1.2: Cloud Storage for Next.js static frontend assets.
        -   [ ] P9.1.1.3: GCP Compute Engine VM for self-hosted Weaviate.
        -   [ ] P9.1.1.4: Cloud Memorystore for Redis.
        -   [ ] P9.1.1.5: Necessary networking (VPC, firewall rules) and IAM permissions.
    -   [ ] P9.1.2: Test Terraform apply and destroy.
-   [ ] **P9.2: CI/CD Pipeline (GitHub Actions)**
    -   [ ] P9.2.1: Create GitHub Actions workflows for:
        -   [ ] P9.2.1.1: Linting and unit testing on push/PR to main branches.
        -   [ ] P9.2.1.2: Building Docker images for backend and frontend.
        -   [ ] P9.2.1.3: Pushing images to Google Artifact Registry (or Docker Hub).
        -   [ ] P9.2.1.4: Deploying to GCP staging/production environments (triggered manually or on merge).
-   [ ] **P9.3: Seed Data Script**
    -   [ ] P9.3.1: Develop `scripts/seed_weaviate.ts` to populate Weaviate with initial sample documents for demo/testing.
-   [ ] **P9.4: Finalize Documentation**
    -   [ ] P9.4.1: Update/complete Functional Specifications (FSD).
    -   [ ] P9.4.2: Update/complete Technical Specifications (Tech Spec).
    -   [ ] P9.4.3: Create User Guide for Developer-Admins (ingestion, monitoring) and end-users (chatbot usage).
    -   [ ] P9.4.4: Ensure `README.md` is comprehensive for developers.

## Phase 10: Final Review, UAT & Release

-   [ ] **P10.1: Internal Testing & Bug Fixing**
    -   [ ] P10.1.1: Conduct thorough internal testing of all features and user flows.
    -   [ ] P10.1.2: Ensure all critical and high-priority bugs are fixed.
-   [ ] **P10.2: User Acceptance Testing (UAT)**
    -   [ ] P10.2.1: Prepare UAT plan and test cases.
    -   [ ] P10.2.2: Conduct UAT with stakeholders (Product, Legal if required).
    -   [ ] P10.2.3: Gather and address UAT feedback.
    -   [ ] P10.2.4: Obtain UAT sign-off.
-   [ ] **P10.3: Release Readiness Check**
    -   [ ] P10.3.1: Verify all release criteria from PRD are met.
    -   [ ] P10.3.2: Confirm deployment and rollback plans are documented and tested.
    -   [ ] P10.3.3: Ensure monitoring and alerting are in place for production.
-   [ ] **P10.4: MVP Launch**
    -   [ ] P10.4.1: Execute production deployment.
    -   [ ] P10.4.2: Perform post-launch smoke tests.
    -   [ ] P10.4.3: Monitor system closely post-launch.