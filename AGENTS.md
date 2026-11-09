# AGENTS.md

Personal portfolio of Máximo Utrera (maxogod), a static single-page app deployed to
<https://maxogod.github.io>. Content is data-driven: **most changes are YAML edits, not code edits.**

## Stack & commands

React 19 + TypeScript (strict), Vite 8 (SWC), Tailwind 4 (via `@tailwindcss/vite`, no config file),
MUI (tooltips only), react-router 7 (`HashRouter`), js-yaml, react-toastify, react-icons.
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
data/language_{en,es}.yaml   UI copy: navbarLinks, navbarGoBack, homePage, aboutMe, titles, cvLink
data/technology_colors.yaml  tech tag -> Tailwind bg class
src/main.tsx -> App.tsx      providers: Theme > Language > Navbar > Router
src/Router.tsx               "/" = Home+Projects+Contact stacked; "/projects/:projectType" = list popup
src/pages/                   Home, Projects (category links), Contact (socials + CV link)
src/components/              ProjectsByType (route -> list), ProjectListPopUp (cards), Bubbles, popups
src/shared/Navbar.tsx        navbar + dropdown tray
src/context/                 xContext.ts = createContext + type; XContextProvider.tsx = provider
src/utils/                   projects.ts / languageUtils.ts (YAML loading), themeUtils.ts, localStorage.ts
src/assets/                  images referenced from YAML
src/@types/ProjectType.ts    ProjectType + ProjectsData
```

## Adding / editing a project

1. Edit **both** `data/projects_en.yaml` and `data/projects_es.yaml`; keep entries in the same order and
   section. Sections: `sys_projects`, `web_projects`, `datasci_projects`, `game_projects`
   (routes `sys`, `web`, `datasci`, `games`). A project may appear in several sections (duplicate it).
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
   are `<br>- ` text. Never put untrusted content here.
4. Each section ends with the "Check out my github for more!" / "Visita mi github para mas!" card; keep it last.
5. Card order = YAML order; strongest projects first. Descriptions emphasize engineering depth
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
  Add a key in both files, then extend the interface + export pair in `src/utils/languageUtils.ts`
  (each export has an English/Spanish variant with a fallback), then expose it via `languageContext`.
- Language: `localStorage.englishModeOn`, defaulting from `navigator.language` (`es*` -> Spanish).
  Components read text/projects from `useContext(languageContext)`, already switched per language.
- CV link: `cvLink` in each language file (Google Drive URL, can differ per language).

## Theming & styling

- Light/dark mode via `themeContext` (`localStorage.darkModeOn`). Theme class strings are defined
  once in `src/utils/themeUtils.ts` (`lightX`/`darkX` pairs) and selected in `ThemeContextProvider`;
  components consume e.g. `backgroundP2`, `textColor`, `buttonColor` from context. To add a themed
  token: add both strings in themeUtils, a field in `themeContextType`, and wire it in the provider.
- Custom palette (`primary`, `light-background-p1..4`, `dark-background-p1..4`, ...) is declared in the
  `@theme` block of `src/index.css`; custom keyframes (`bubble`, `custom-animate-bounce`, ...) live there too.
- Styling is Tailwind utility classes inline; no CSS modules. MUI is only for `Tooltip`; don't expand it.

## Conventions

- Function components + hooks; contexts split into `xContext.ts` (context/type) and
  `XContextProvider.tsx` (provider) so the `react/only-export-components` lint rule passes.
- No formatter is configured and quote/indent/semicolon style varies per file: match the surrounding file.
- Routing is hash-based (GitHub Pages has no SPA fallback); keep `HashRouter`. Home sections are
  anchors (`#about`, `#projects`, `#contact`); `Router.tsx` restores home scroll position on return.
- Commits: conventional style (`feat:`, `fix:`, `chore:`), e.g. `chore: update cv in language_es.yaml`.
- `dist/` is gitignored. Don't commit loose root files (e.g. report PDFs used as source material).
