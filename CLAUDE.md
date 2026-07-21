# CLAUDE.md — Clix New Website

## Project Overview

A single continuous-scroll **React.js** website for **Clix**, using **scale.com** as the design reference.

- Recreate the layout, structure, typography feel, spacing, and animation style of scale.com as one continuous page (hero → products → solutions → research → resources → footer flow).
- **Exception:** the heavy 3D scene on scale.com's second section is NOT wanted. Replace it with something simpler and cleaner (e.g. a subtle animated grid, flowing lines, or a lightweight canvas/SVG animation).
- Use Clix branding and original copy — do not copy Scale's logo, brand name, or text verbatim. The goal is a design clone in structure and vibe, not a content copy.
- Dark theme, minimal, premium enterprise-AI aesthetic.

## Tech Stack

- React.js (Vite)
- Framer Motion — component/mount/gesture animations
- GSAP + ScrollTrigger — scroll-driven, pinned, and scrubbed animations
- CSS: plain CSS or Tailwind (decide at project setup)

## Skills — Auto-Use Rules

Automatically invoke the relevant skill (via the Skill tool) whenever its domain comes up. Do not wait to be asked.

| Skill | Auto-use when |
|---|---|
| `using-superpowers` | At the start of every session / before responding |
| `brainstorming` | Before building any new feature, section, or component |
| `framer-motion` | Any component animation, transitions, hover/gesture, AnimatePresence, stagger, whileInView |
| `gsap` | Any scroll-driven animation, ScrollTrigger, pinned sections, parallax, scrubbed timelines, marquees |
| `ui-ux-pro-max` | Any UI/UX design decision — layout, color, typography, spacing, accessibility, responsiveness |
| `artifact-design` / `dataviz` | Design fundamentals, charts, or visual previews |
| `prompt-master` | When the user asks to write/fix/improve a prompt for an AI tool |
| `prompt-architect` | When the user asks to structure or engineer a prompt |
| `systematic-debugging` | Any bug, test failure, or unexpected behavior |
| `test-driven-development` | Before implementing features where tests make sense |
| `verification-before-completion` | Before claiming any task is complete |

Rule of thumb: **GSAP for scroll choreography, Framer Motion for component state/mount/gesture animation.** Don't mix both on the same element.

## Memory / Auto-Save Rule (IMPORTANT)

This project uses `context.md` as persistent project memory.

1. **After finishing every task**, automatically append an entry to `context.md` — no need to be asked. Each entry includes:
   - Date
   - Task name / what was requested
   - What was done (files created/changed, decisions made)
   - Current project state / what's next
2. **After saving to `context.md`, remind the user to run `/compact` before starting the next task.** Say it explicitly, e.g.: *"✅ Saved to context.md — remember to `/compact` before starting the next task."*
3. **At the start of every session, read `context.md` first** to restore project memory before doing anything else.

## Conventions

- One continuous page: all sections live in `src/sections/`, composed in `App.jsx`.
- Reusable UI primitives in `src/components/`.
- Keep sections self-contained (own styles + animations).
- Mobile-responsive throughout; test at 375px, 768px, 1440px.
- Performance matters: lazy-load below-the-fold sections, no heavy 3D libraries.
