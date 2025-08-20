# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fed Markets Monitor is a React application built with TypeScript and Vite that monitors Federal Reserve reverse repo
operations and market data. The project can be deployed as both a web application and Chrome extension using the
@crxjs/vite-plugin.

## Development Commands

- `bun dev` - Start development server
- `bun run build` - Build the project (TypeScript compilation + Vite build)
- `bun run lint` - Run Biome linting with automatic fixes
- `bun run preview` - Preview the production build

Note: This project uses Bun as the package manager and runtime.

## Code Architecture

### Data Flow

- **Services Layer** (`src/services/`): API integration with NY Fed markets data
- **Types** (`src/types/`): TypeScript interfaces for Fed markets API responses
- **Components** (`src/components/`): React components with co-located data fetching using TanStack Query
- **UI Components** (`src/components/ui/`): shadcn/ui component library (excluded from linting)

### API Integration

- Base API: `https://markets.newyorkfed.org/api/rp/reverserepo/all/results`
- Primary endpoint: `/lastTwoWeeks.json`
- Data fetching handled by TanStack Query with `useQuery` hooks
- Error handling and loading states managed at component level

### Chrome Extension Configuration

- Manifest V3 extension defined in `manifest.config.ts`
- Host permissions for `markets.newyorkfed.org` and localhost
- Extension popup uses the same React app via `index.html`

## Development Patterns

### Component Structure

- Components use TanStack Query for data fetching
- Loading and error states are handled with reusable `<Loader>` and `<Alert>` components
- Metric cards and data tables follow established patterns in existing components

### Styling

- Tailwind CSS for styling with custom configuration
- UI components from shadcn/ui library
- Responsive design patterns (mobile-first grid layouts)

### Type Safety

- Strict TypeScript configuration with path aliasing (`@/` for src)
- Comprehensive types for Fed markets API responses
- Component props and state properly typed

## Code Quality

### Linting & Formatting

- Biome for linting and formatting (replaces ESLint/Prettier)
- Double quotes for JavaScript/TypeScript
- Space indentation
- Automatic import organization
- UI components and utility files excluded from linting

### File Organization

- Services contain pure functions for API calls
- Components are organized by feature (reverse-repo operations)
- Shared UI components in dedicated ui folder
- Types mirror API response structure

## Build Process

The build process creates both web and extension builds:

1. TypeScript compilation (`tsc -b`)
2. Vite build with React and Tailwind plugins
3. Chrome extension manifest generation via @crxjs/vite-plugin

## Claude-Specific Instructions

- When creating git commits, use short commit messages (title only) without detailed descriptions
- Follow the conventional commit format but keep messages concise