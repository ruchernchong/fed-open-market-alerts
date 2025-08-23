# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fed Open Market Alerts is a React application built with TypeScript and Vite that monitors Federal Reserve 
Open Market Operations with automated alerts for new operations. The project can be deployed as both a web 
application and Chrome extension using the @crxjs/vite-plugin.

## Development Commands

- `bun dev` - Start development server
- `bun run build` - Build the project (TypeScript compilation + Vite build)
- `bun run lint` - Run Biome linting with automatic fixes
- `bun run preview` - Preview the production build
- `bun run release` - Run semantic-release locally (for testing)

Note: This project uses Bun as the package manager and runtime.

## Code Architecture

### Data Flow

- **Services Layer** (`src/services/`): API integration, notifications, scheduling, and storage management
  - `reverse-repo.ts`: Fed markets API integration
  - `notifications.ts`: Chrome extension notification handling
  - `scheduler.ts`: Automated data check scheduling for weekdays
  - `storage.ts`: Chrome extension storage for timestamp tracking
- **Types** (`src/types/`): TypeScript interfaces for Fed markets API responses
- **Components** (`src/components/`): React components with co-located data fetching using TanStack Query
- **UI Components** (`src/components/ui/`): shadcn/ui component library (excluded from linting)
- **Background Script** (`src/background.ts`): Chrome extension service worker for automated notifications

### API Integration

- Base API: `https://markets.newyorkfed.org/api/rp/reverserepo/all/results`
- Primary endpoint: `/lastTwoWeeks.json`
- Data fetching handled by TanStack Query with `useQuery` hooks
- Error handling and loading states managed at component level

### Chrome Extension Configuration

- Manifest V3 extension defined in `manifest.config.ts`
- Host permissions for `markets.newyorkfed.org` and localhost
- Extension popup uses the same React app via `index.html`
- Background service worker (`src/background.ts`) handles scheduled notifications
- Push notifications with chrome.notifications API for new Fed operations

### Notification System

- **Automated Scheduling**: Checks for new Fed data weekdays at 1:20 PM EST
- **Smart Notifications**: Only notifies on actual data changes using timestamp comparison
- **Storage Integration**: Tracks last updated timestamps to prevent duplicate notifications
- **Manual Triggers**: Background script supports on-demand data checks via message passing

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

## Commit Conventions & Release Management

### Conventional Commits

This project uses [Conventional Commits](https://conventionalcommits.org/) with automated semantic versioning:

**Commit Format:**
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Commit Types:**
- `feat:` - New features (triggers minor version bump)
- `fix:` - Bug fixes (triggers patch version bump)
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring without feature changes
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks, dependency updates
- `ci:` - CI/CD configuration changes

**Examples:**
```bash
feat(reverse-repo): add real-time data updates
fix(charts): resolve tooltip positioning issue
docs: update API integration guide
chore(deps): update @tanstack/react-query to v5.85.6
```

**Breaking Changes:**
- Add `!` after type: `feat!: redesign API response structure`
- Or include `BREAKING CHANGE:` in commit footer

### Automated Releases

- **Main Branch:** Produces prerelease versions (e.g., `1.0.0-beta.1`, `1.0.0-beta.2`)
- **Releases:** Triggered automatically on push to main via GitHub Actions
- **Version Control:** Managed by semantic-release based on commit messages
- **Git Hooks:** Commitlint validates commit messages before commit

**Release Process:**
1. Make changes following conventional commit format
2. Push to main branch
3. GitHub Actions runs tests, linting, build, and semantic-release
4. New version published with auto-generated changelog and GitHub release

## Build Process

The build process creates both web and extension builds:

1. TypeScript compilation (`tsc -b`)
2. Vite build with React and Tailwind plugins
3. Chrome extension manifest generation via @crxjs/vite-plugin

## Claude-Specific Instructions

- When creating git commits, use short commit messages (title only) without detailed descriptions
- Follow the conventional commit format but keep messages concise