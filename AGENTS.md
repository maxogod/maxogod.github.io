# AGENTS.md

Portfolio of Máximo Utrera, a static React SPA deployed to <https://maxogod.github.io>.
Content lives in `data/*.yaml`; most changes are data edits, not code.

## Commands

- pnpm only; pin exact versions (the workspace enforces a minimum release age).
- `pnpm dev` (:3000), `pnpm build` (tsc + vite), `pnpm lint` (oxlint, 0 warnings). No tests: build + lint must pass.
- Pushing to `main` deploys to production (GitHub Pages workflow).

## Architecture

React 19 + TS strict, Vite, Tailwind 4 (no config; tokens in `src/index.css` `@theme`), react-router
`HashRouter`, MUI for `Tooltip` only, react-toastify, react-icons.

- Every route renders `pages/Dive.tsx`; `/projects/:filter[/:slug]` only sets the project filter and open
  modal. Scroll to sections with `scrollToSection()`, never `href="#id"` (it changes the route).
- Scroll maps to depth (`utils/depth.ts`). Read it with `useDepthValue(selector)`, which re-renders only when
  that value changes; don't use `useDepth()` in large components.
- Game state (achievements, treasures, logbook) lives in `GameContextProvider`, saved to
  `localStorage.diveLog`. Canvas engines: `utils/oceanLife.ts`, `utils/deepRun.ts`.
- Contexts are split into `xContext.ts` (context + type) and `XContextProvider.tsx` for the
  `only-export-components` lint rule.

## Projects (`data/projects_{en,es}.yaml`)

- Edit both files in the same order. Sections: `sys_projects`, `web_projects`, `datasci_projects`,
  `game_projects` (filters `sys`, `web`, `datasci`, `games`); a project may repeat across sections.
- Required fields (`""`/`[]` when empty): `name`, `description`, `image` (`assets/x.jpg`, must exist in
  `src/assets/`, ideally < 250 KB), `url`, `vid`, `technologies`. Each section ends with the GitHub card
  marked `more: true`.
- The first entry is the large featured card, so put the strongest first. Descriptions: impersonal,
  recruiter-ready, focused on architecture, infra and measurable results.
- `description` is trusted raw HTML: `<br><br>` starts a paragraph, `<br>- ` a bullet; the first paragraph
  is the card excerpt.
- Each technology must be a key in `data/technology_colors.yaml` (case-sensitive) mapped to a literal
  Tailwind class (`bg-teal-400`). Never build class names dynamically; Tailwind can't see them.

## Copy & i18n

- All visible text goes in `data/language_{en,es}.yaml` plus the `Copy` interface in
  `utils/languageUtils.ts`; components read `text` from `languageContext`. Spanish falls back to English;
  fill `{n}` placeholders with `fill()`.
- New achievement or treasure: add the id to the union in `languageUtils.ts`, an entry with icon in
  `utils/game.ts`, and copy in both YAML files.

## Styling

- Tailwind utilities inline. Tokens: `foam`, `ink`, `glow`, `signal`, `coral`, `twilight`, `midnight`,
  `abyss`. Day/night is `<html data-theme>` (Tailwind `dark:`); it only changes the sky and surface.
- Layering: section backgrounds < fixed OceanLife canvas (`z-[1]`) < content (`relative z-10`). No
  transform, filter or opacity on `<section>`.
- Phones are the bottleneck: no `mix-blend-mode` or large blurs on big or animated areas, no React
  re-renders per scroll frame, respect `prefers-reduced-motion` (`useReducedMotion`).
- Seasons (`utils/season.ts`): October halloween, December christmas, January 1-15 newyear.
  `?theme=<id|none>` overrides the date and is written to the URL automatically. Styles are in the
  seasonal block of `index.css`, scenery in `components/SeasonScenery.tsx`, greetings in `seasons.<id>`.

## Conventions

- No formatter: match each file's quote and semicolon style.
- Comments only for non-obvious reasons; keep docstrings short.
- Conventional commits (`feat:`, `fix:`, `chore:`). Don't commit `dist/` or loose root files (e.g. report PDFs).
