# maxogod.github.io

Personal portfolio. Live at <https://maxogod.github.io>.

Projects and other text information are YAML files under `data/`, so adding a project means editing a
data file, not a component.

## Stack

React 19 and TypeScript, bundled by Vite 8. Tailwind 4 for styling, MUI for
tooltips only, react-router 7 for routing, js-yaml to read the content files.

## Running

Needs Node 20.19+ and pnpm. CI builds on Node 26.

```sh
pnpm install
pnpm dev        # localhost:3000
pnpm build      # tsc, then vite build into dist/
pnpm preview    # serve the built dist/
pnpm lint       # eslint
```

## Layout

```
src/
  main.tsx       entry
  App.tsx        nests the theme, language and navbar providers
  Router.tsx     HashRouter, route table, home scroll restoration
  pages/         Home, Projects, Contact, the three home sections
  components/    popups, per-category project list, background bubbles
  shared/        Navbar and its dropdown tray
  context/       xContext.ts holds the context, XContextProvider.tsx the provider
  utils/         YAML loading, theme class strings, localStorage
  assets/        images
data/            project and copy files, English and Spanish
```

## Content

* Projects: `data/projects_{en,es}.yaml`.
* Page text and info: `data/language_{en,es}.yaml` (picked from `navigator.language`)
* Technologies list: `data/technology_colors.yaml` (maps a technology name to a Tailwind class).

