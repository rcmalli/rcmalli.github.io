# Default recipe - show available commands
default:
    @just --list

# Start development server with hot reload
dev:
    pnpm dev

# Build static site for production
build:
    pnpm build

# Preview production build locally
preview:
    pnpm preview

# Install dependencies
install:
    pnpm install
