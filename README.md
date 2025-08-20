# Fed Markets Monitor

A React application that monitors Federal Reserve reverse repo operations and market data. Built with TypeScript and
Vite, deployable as both a web application and Chrome extension.

## Features

- **Real-time Market Data**: Monitor Federal Reserve reverse repo operations
- **Data Visualization**: Interactive charts and tables for market trends
- **Dual Deployment**: Web application and Chrome extension support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type-Safe**: Built with TypeScript for reliability

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite with hot module replacement
- **Data Fetching**: TanStack Query for efficient API management
- **UI Components**: shadcn/ui component library
- **Charts**: Recharts for data visualization
- **Package Manager**: Bun
- **Code Quality**: Biome for linting and formatting
- **Extension**: Chrome Manifest V3 with @crxjs/vite-plugin

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended package manager)
- Node.js 18+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd fed-markets-monitor

# Install dependencies
bun install
```

### Development

```bash
# Start development server
bun dev

# Run linting with automatic fixes
bun run lint

# Build for production
bun run build

# Preview production build
bun run preview

# Run semantic-release locally (for testing)
bun run release
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components (excluded from linting)
│   └── reverse-repo/    # Feature-specific components
├── services/            # API integration layer
├── types/              # TypeScript type definitions
├── lib/                # Utility functions
└── assets/             # Static assets
```

## API Integration

The application fetches data from the New York Federal Reserve Markets API:

- **Base URL**: `https://markets.newyorkfed.org/api/rp/reverserepo/all/results`
- **Primary Endpoint**: `/lastTwoWeeks.json`
- **Data Handling**: TanStack Query with automatic caching and error handling

## Chrome Extension

The project includes Chrome extension support:

- **Manifest**: V3 extension defined in `manifest.config.ts`
- **Permissions**: Access to `markets.newyorkfed.org` and localhost
- **Popup**: Uses the same React app via `index.html`

To load the extension in development:

1. Run `bun run build`
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `dist` folder

## Development Patterns

### Component Architecture

- Components use TanStack Query hooks for data fetching
- Loading states handled with reusable `<Loader>` components
- Error handling with `<Alert>` components
- Metric cards and data tables follow established patterns

### Code Quality

- Strict TypeScript configuration with path aliasing (`@/` for src)
- Biome for consistent linting and formatting
- Double quotes and space indentation
- Automatic import organization

## Build Process

The build creates both web and extension builds:

1. TypeScript compilation (`tsc -b`)
2. Vite build with React and Tailwind plugins
3. Chrome extension manifest generation

## Contributing

### Commit Conventions

This project uses [Conventional Commits](https://conventionalcommits.org/) with automated semantic versioning:

**Commit Format:**
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Common Types:**
- `feat:` - New features (triggers minor version bump)
- `fix:` - Bug fixes (triggers patch version bump)
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring without feature changes
- `chore:` - Maintenance tasks, dependency updates
- `ci:` - CI/CD configuration changes

**Examples:**
```bash
feat(reverse-repo): add real-time data updates
fix(charts): resolve tooltip positioning issue
docs: update README installation guide
chore(deps): update react to v19.1.2
```

### Development Guidelines

1. Follow the existing code patterns and conventions
2. Use the established component structure
3. Ensure TypeScript types are properly defined
4. Write commit messages following conventional commit format
5. Run `bun run lint` before committing
6. Test both web and extension builds

### Release Process

- **Automated Releases**: Triggered on push to main branch via GitHub Actions
- **Prerelease Versions**: Main branch produces beta versions (e.g., `1.0.0-beta.1`)
- **Version Control**: Managed by semantic-release based on commit messages
- **Git Hooks**: Commitlint validates commit messages before commit

## License

[MIT](LICENSE)