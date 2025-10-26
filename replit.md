# Algorithm Complexity Comparison Platform

## Overview

An educational web application for comparing algorithm performance through interactive benchmarking and visualization. Users can select multiple sorting and search algorithms, configure dataset parameters, and view real-time execution time measurements with visual comparisons.

The platform focuses on making complex algorithmic concepts accessible through clean data presentation, featuring interactive charts, detailed complexity information, and side-by-side performance comparisons.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React with TypeScript, using Vite as the build tool and development server

**UI Framework:** shadcn/ui component library built on Radix UI primitives, styled with Tailwind CSS

**Design System:**
- Typography: Inter for UI/body text, JetBrains Mono for code
- Color scheme: Neutral-based palette with light/dark theme support
- Spacing: Tailwind's spacing scale (2, 4, 6, 8, 12, 16, 24)
- Component pattern: Card-based layouts with consistent padding and borders

**State Management:** 
- React Query (@tanstack/react-query) for server state and API interactions
- Local component state (useState) for UI controls and form data
- Theme management via React Context (ThemeProvider)

**Routing:** Wouter for lightweight client-side routing

**Data Visualization:** Recharts library for rendering performance comparison charts

**Key Design Decisions:**
- Single-page application with minimal routing (dashboard-centric)
- Component-driven architecture with reusable UI primitives
- Form validation using react-hook-form with Zod schemas
- Accessibility-first approach through Radix UI primitives

### Backend Architecture

**Runtime:** Node.js with Express.js framework

**Language:** TypeScript with ESNext module system

**API Design:** RESTful API with JSON request/response format

**Core Endpoints:**
- `POST /api/benchmark` - Executes algorithm benchmarks with configurable parameters

**Algorithm Execution:**
- On-demand computation (no result caching)
- Synchronous execution with performance.now() timing
- In-memory dataset generation
- Support for multiple algorithms and dataset sizes in single request

**Key Design Decisions:**
- Stateless API design - all benchmarks computed on request
- No persistent storage required (all operations are ephemeral)
- Algorithm implementations separated into dedicated module (server/algorithms.ts)
- Input validation using Zod schemas shared between client and server

### Data Storage Solutions

**Current Implementation:** No persistent database

**Storage Strategy:**
- All benchmark results are ephemeral and computed on-demand
- No historical data retention
- State managed entirely in client-side React components

**Rationale:** The application is educational/demonstration-focused with no need for user accounts, saved benchmarks, or historical tracking

**Note:** The codebase includes Drizzle ORM configuration and Postgres/Neon setup in anticipation of potential future features (user accounts, benchmark history, etc.), but these are not currently utilized.

### Code Sharing

**Shared Schema Module:** TypeScript types and Zod validation schemas shared between client and server via `shared/schema.ts`

**Shared Definitions:**
- Algorithm types and categories
- Dataset type definitions
- Benchmark configuration schemas
- Algorithm metadata interfaces
- Result data structures

## External Dependencies

### Third-Party UI Libraries
- **Radix UI:** Unstyled, accessible component primitives (accordion, dialog, dropdown, etc.)
- **shadcn/ui:** Pre-built component library based on Radix UI
- **Tailwind CSS:** Utility-first CSS framework for styling
- **Recharts:** Chart library for data visualization
- **Lucide React:** Icon library

### Development Tools
- **Vite:** Frontend build tool and development server
- **Replit Plugins:** Development environment enhancements (error overlay, cartographer, dev banner)

### Backend Libraries
- **Express:** Web application framework
- **Zod:** Schema validation for runtime type checking
- **Drizzle ORM:** SQL ORM (configured but not actively used)

### Database
- **Neon (Postgres):** Configured via Drizzle but not currently utilized in the application
- Connection string expected via `DATABASE_URL` environment variable

### Fonts
- **Google Fonts:** Inter (400, 500, 600, 700) and JetBrains Mono (400)

### State Management
- **TanStack Query (React Query):** Server state management and data fetching
- **React Hook Form:** Form state and validation
- **Wouter:** Lightweight routing library