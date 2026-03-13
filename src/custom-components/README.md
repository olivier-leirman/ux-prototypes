# Custom Components

Components created during UX prototyping that are candidates for inclusion in the Lochting Design System documentation site.

## Convention

Each component in this folder should:
- Only import from `@mui/material`, `../theme/`, or `../components/`
- Use `useBrand()` for brand-aware colors/effects
- Export named functions (no default exports)
- Be self-contained — can be moved to `lochting-showcase/src/components/` with zero refactoring

## Components

- **ActivityTimeline** — Vertical timeline with dots, connecting lines, and timestamp + description entries
