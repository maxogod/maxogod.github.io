# AGENTS.md

Personal portfolio of Máximo Utrera (maxogod), a static single-page app deployed to
<https://maxogod.github.io>. Content is data-driven: **most changes are YAML edits, not code edits.**

## Stack & commands

React 19 + TypeScript (strict), Vite 8 (SWC), Tailwind 4 (via `@tailwindcss/vite`, no config file),
MUI (tooltips only), react-router 7 (`HashRouter`), js-yaml, react-toastify, react-icons.
Fonts (Google Fonts, `index.html`): Bricolage Grotesque (`font-display`, everything) and Martian Mono
(`font-gauge`, instrument readouts and scores only).

The site is a single scrolling "dive": hero at the surface (waves, name split by the waterline), then
About (sunlight zone), Projects (twilight), Contact (midnight) and the Abyss (sea floor + mini game).
Scroll position maps to a depth in meters (`src/utils/depth.ts`); the HUD, ocean life and achievements
read it. Game-like layer: hidden treasures, sonar ping (P key), poppable bubbles, achievements and a
logbook (saved in `localStorage.diveLog`), the Deep Run canvas game, and a cheat-code whale.
Package manager is **pnpm** (`pnpm-lock.yaml`); do not create `package-lock.json`.

```sh
pnpm dev      # http://localhost:3000 (host 0.0.0.0)
pnpm build    # tsc && vite build -> dist/   (run before finishing any change)
pnpm lint     # oxlint, --max-warnings 0 (warnings fail too)
```

No test suite: `pnpm build` + `pnpm lint` are the verification gate.
Deploy: `.github/workflows/deploy.yml` builds on every push to `main` (Node 26) and publishes `dist/`
to GitHub Pages. Pushing to `main` = shipping to production.
`pnpm-workspace.yaml` enforces a minimum release age for deps; pin exact versions (no `^`).

## Layout

```
data/projects_{en,es}.yaml   project cards, 4 categories, both languages
data/language_{en,es}.yaml   all UI copy (typed by `Copy` in languageUtils.ts), achievements, cvLink
data/technology_colors.yaml  tech tag -> Tailwind bg class
src/main.tsx -> App.tsx      providers: Theme > Language > Game > Router
src/Router.tsx               HashRouter + ToastContainer; every path renders pages/Dive.tsx
src/pages/Dive.tsx           the whole page; parses "/" and "/projects/:filter[/:slug]"
src/pages/                   Hero, About, Projects (filter + grid + modal), Contact, Abyss
src/components/              TopBar, DepthGauge (rail + readout + sonar), OceanLife (canvas), Waves,
                             Submarine, ProjectCard, ProjectModal, TechTags, Treasure, DeepRun,
                             Logbook, Overlays (sonar rings, whale), SectionHeading
src/context/                 xContext.ts = createContext + type; XContextProvider.tsx = provider
src/utils/                   projects.ts / languageUtils.ts (YAML loading), depth.ts (scroll -> depth
                             store), game.ts (achievement/treasure ids + icons), deepRun.ts and
                             oceanLife.ts (canvas engines), sound.ts (WebAudio blips), description.ts,
                             localStorage.ts (all access wrapped in try/catch)
src/hooks/                   useDepth, useReducedMotion
src/assets/                  images referenced from YAML or components
src/@types/ProjectType.ts    ProjectType, Project (+slug, category), CATEGORIES
```

## Adding / editing a project

1. Edit **both** `data/projects_en.yaml` and `data/projects_es.yaml`; keep entries in the same order and
   section. Sections: `sys_projects`, `web_projects`, `datasci_projects`, `game_projects`
   (routes `sys`, `web`, `datasci`, `games`). A project may appear in several sections (duplicate it);
   the "All" filter dedupes by name. Each project gets a slug from its name, used in
   `#/projects/<filter>/<slug>` deep links that open its modal.
2. Entry shape (all fields required; use `""` for missing `url`/`vid`, `[]` for no tech):
   ```yaml
   - name: "Project"
     description: "Intro.<br><br>Architecture paragraph.<br><br>Key features include:<br>- A.<br>- B."
     image: "assets/file.jpg"      # file must exist in src/assets/
     url: "https://github.com/..." # link button hidden when ""
     vid: "https://youtube.com/..."# video button hidden when ""
     technologies: ["Go", "Docker"]
   ```
3. `description` is injected as raw HTML (`dangerouslySetInnerHTML`): line breaks are `<br>`, bullets
   are `<br>- ` text. `utils/description.ts` turns `<br><br>` into paragraphs and `- ` lines into a list;
   the first paragraph is the card excerpt. Never put untrusted content here.
4. Each section ends with the "Check out my github for more!" / "Visita mi github para mas!" card, marked
   `more: true` (the only optional field). It renders as the "More on GitHub" tile; keep it last.
5. Card order = YAML order; the first project of the selected filter is the large featured card, so put
   the strongest project first. Descriptions emphasize engineering depth
   (architecture, infra, scale, measurable results) in a recruiter/LinkedIn-ready tone, impersonal voice.
6. Images: `projects.ts` resolves `image` via `import.meta.glob('../assets/*')`. A path with no matching
   file silently falls back to the raw string (broken image), so verify the file exists. Prefer
   compressed `.jpg`/`.png`, ideally < ~250 KB.

## Technology tags

- Every string in `technologies` must be a key in `data/technology_colors.yaml`, otherwise the tag
  renders with no background color. Reuse existing names exactly (case-sensitive, e.g. `Pytorch`,
  `MySql`, `Kong-Gateway`) before adding new ones.
- Values must be **literal, full Tailwind classes** (`"bg-teal-400"`). `src/index.css` has
  `@source "../data/technology_colors.yaml"` so Tailwind scans that file; dynamically built class
  names (string concatenation) will be purged. The same rule applies to any class in TSX.

## UI copy & i18n

- All user-visible text lives in `data/language_{en,es}.yaml`; never hardcode copy in components.
  Add a key in both files and to the `Copy` interface in `src/utils/languageUtils.ts`; components read
  it as `text.section.key` from `languageContext`. Missing Spanish keys fall back to English.
  Placeholders like `{n}` are filled with `fill()`.
- New achievement/treasure: add the id to the union in languageUtils.ts, an entry (with icon) in
  `utils/game.ts`, copy in both language files, and call `unlock(id)` / place a `<Treasure id>`.
- Language: `localStorage.englishModeOn`, defaulting from `navigator.language` (`es*` -> Spanish).
  Components read text/projects from `useContext(languageContext)`, already switched per language.
- CV link: `cvLink` in each language file (Google Drive URL, can differ per language).

## Theming & styling

- Day/night via `themeContext` (`localStorage.darkModeOn`), which sets `<html data-theme>`. Only the
  surface changes (sky, sun/moon, top water colors: `--sky-*`, `--water-*` vars in `src/index.css`);
  deeper water is dark in both. Use Tailwind's `dark:` variant (custom variant on `data-theme`).
- Palette tokens live in the `@theme` block of `src/index.css`: `foam` (text), `ink` (text on sky),
  `glow` (bioluminescent cyan), `signal` (instrument amber, primary buttons), `coral`, `twilight`,
  `midnight`, `abyss`. Section backgrounds are `.water-*` classes chained so each ends on the next's
  start color. Custom keyframes (`wave`, `bob`, `sonar`, `whale`, ...) are in `@theme` too.
- Layering: section backgrounds < OceanLife canvas (`z-[1]`, fixed) < section content (`relative z-10`).
  Don't add transform/filter/opacity to `<section>` elements or the canvas will paint over content.
- Respect `prefers-reduced-motion` (`useReducedMotion`): the ocean canvas is skipped and CSS
  animations are neutralized in index.css.
- Styling is Tailwind utility classes inline; no CSS modules. MUI is only for `Tooltip`; don't expand it.

## Seasonal themes

- `src/utils/season.ts` picks a season by date: October `halloween`, December `christmas`,
  January 1-15 `newyear`. It runs in `main.tsx` before React, sets `<html data-season>` and writes
  `?theme=<season>` into the URL (before the hash). Typing `?theme=halloween|christmas|newyear|none`
  overrides the date, which is how to preview them. In code it is called "season" because "theme"
  already means day/night.
- Seasons only restyle the surface: sky/sun variables and `.topbar`/`.hero-sun` tweaks in the
  "Seasonal themes" block of `src/index.css`, decorations in `src/components/SeasonScenery.tsx`
  (`SeasonSky`, `SeasonFloat`, `SeasonHat`, `SeasonGreeting`), fish colors in `SEASON_LIFE`.
  Greeting copy is `seasons.<id>` in both language files; it shows once per browser session.
- To add a season: extend `SEASONS` + `seasonForDate`, add a `SEASON_LIFE` entry, CSS vars for
  light and `[data-theme="dark"]`, scenery cases, and a greeting in both language files.

## Conventions

- Function components + hooks; contexts split into `xContext.ts` (context/type) and
  `XContextProvider.tsx` (provider) so the `react/only-export-components` lint rule passes.
- No formatter is configured and quote/indent/semicolon style varies per file: match the surrounding file.
- Routing is hash-based (GitHub Pages has no SPA fallback); keep `HashRouter`. Section ids
  (`surface`, `about`, `projects`, `contact`, `abyss`) are scrolled to with `scrollToSection()`, never
  `href="#id"` (that would change the route). The page never unmounts; routes only set the project
  filter and the open modal.
- Commits: conventional style (`feat:`, `fix:`, `chore:`), e.g. `chore: update cv in language_es.yaml`.
- `dist/` is gitignored. Don't commit loose root files (e.g. report PDFs used as source material).
