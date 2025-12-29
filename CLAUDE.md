# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Refik Can MALLI built with Astro, Tailwind CSS, and React islands. Features a blog with MDX content collections, LaTeX math rendering, and dark/light mode. Deployed to GitHub Pages via GitHub Actions.

## Commands

```bash
# Install dependencies (using pnpm)
pnpm install

# Start development server with hot reload
pnpm dev

# Build static site for production
pnpm build

# Preview production build locally
pnpm preview

# Deployment happens automatically via GitHub Actions on push to master
```

## Architecture

### Tech Stack
- **Astro 5** - Static site generator with islands architecture
- **Tailwind CSS v4** - Utility-first CSS framework
- **React** - For interactive components (islands)
- **shadcn/ui** - UI component library (new-york style, gray base color)
- **MDX** - Enhanced Markdown for blog posts
- **KaTeX** - LaTeX math rendering (remark-math + rehype-katex)
- **pnpm** - Package manager

### Directory Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (Button, Card, etc.)
│   ├── common/          # ThemeToggle.tsx, Analytics.astro
│   ├── layout/          # Header.astro, Footer.astro
│   ├── home/            # ProfileCard, SocialLinks, UpdatesSection, AcademicSection
│   └── blog/            # BlogCard.astro
├── content/
│   ├── config.ts        # Content collections schema (Zod validation)
│   └── blog/            # MDX blog posts
├── layouts/
│   ├── BaseLayout.astro # Main HTML layout with SEO, theme script
│   └── BlogLayout.astro # Blog post layout
├── pages/
│   ├── index.astro      # Home page
│   ├── blog/
│   │   ├── index.astro  # Blog listing
│   │   └── [...slug].astro  # Dynamic blog post routes
│   └── l.astro          # LinkedIn redirect
└── styles/
    └── global.css       # Tailwind, typography, KaTeX, CSS variables
public/
├── assets/
│   ├── images/          # Profile photo
│   └── pdfs/            # CVs and presentation slides
└── favicon.svg
```

### Key Configuration Files
- `astro.config.mjs` - Site URL, integrations (React, MDX), markdown plugins
- `tailwind.config.ts` - Tailwind configuration
- `tsconfig.json` - TypeScript paths (`@/*` alias)
- `components.json` - shadcn/ui configuration

## Features

- **Dark/Light Mode** - Toggle with localStorage persistence, no flash on load
- **Blog** - Content collections with Zod schema validation, tag support
- **Math Rendering** - KaTeX for LaTeX equations in MDX posts
- **Responsive Design** - Mobile-first with Tailwind breakpoints
- **SEO** - Meta tags, Open Graph support
- **Google Analytics 4** - G-XNYHZDV9QB

## Content Collections

Blog posts use this schema (defined in `src/content/config.ts`):

```typescript
schema: z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
})
```

## Adding a New Blog Post

1. Create a new `.mdx` file in `src/content/blog/`
2. Add frontmatter with required fields (title, description, pubDate)
3. Use KaTeX for math: `$inline$` or `$$block$$`
4. Draft posts (`draft: true`) are excluded from production builds

## React Islands

React components that need interactivity use Astro's island architecture:
- `ThemeToggle.tsx` - Uses `client:load` for immediate hydration
- Add `client:load` or `client:visible` directive when using React components in Astro files

## Deployment

GitHub Actions automatically deploys to GitHub Pages on push to `master` branch.
Workflow: `.github/workflows/ci.yml` using `withastro/action@v3`
