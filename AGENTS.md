# Agent instructions for the React SPA tutorial

This repository contains the **React SPA tutorial** for Enonic: a working Vite + React + TypeScript application in `src/`,
and the tutorial text in `docs/`, written in AsciiDoc and published to https://developer.enonic.com/learn/react-spa.

Shared conventions for Enonic documentation (publishing pipeline, menu and version files, AsciiDoc rules) are in the
`enonic-docs` skill from the `enonic-contrib` plugin of https://github.com/enonic/agent-toolkit. Install it and follow it for
every change under `docs/`. The rules below are the ones specific to this repository, plus the few shared rules that must hold
even without the skill.

## Scope and audience

- This is a tutorial, not reference documentation. The skill's "reference documentation, not tutorials" rule does not apply
  here; its other rules do.
- It teaches React developers to build a client-side single-page application that reads published content from Enonic through
  the Guillotine GraphQL API and renders rich text with `@enonic/react-components`.
- It covers content delivery only. Previewing draft content, server-side rendering and Next.js are out of scope; link to the
  Next.js tutorial for those.
- Reference separately documented products (Enonic XP, Guillotine, the CLI) with a short summary and a link; do not re-document
  them.

## Versioning

- Versions are named after the `@enonic/react-components` major they document, and are listed in `docs/versions.json` on
  `master`.
- `master` holds the 7.x tutorial (Enonic XP 8, Guillotine 9), published as `next` until it is released.
- The `6.x` branch holds the released tutorial, published as `stable`.
- When 7.x is released: point `stable` at `master`, and list `6.x` under its own label.
- The stack the tutorial was written and tested with is declared in the tutorial itself. Update that declaration whenever a
  major of Enonic XP, Guillotine, `@enonic/react-components`, React or Vite changes.

## Code and text belong together

- Chapters include source files directly from the repository (`include::{sourcedir}src/...[]`), so a change to `src/` or
  `vite.config.ts` changes the published tutorial. Check the chapter that includes a file before editing it.
- `src/components/Person.tsx` carries `tag::`/`end::` comment markers that chapters use to show the file in stages. Keep them.
- `src/components/PersonWithoutExtensions.tsx` is the earlier stage of `Person.tsx` shown in the details chapter. Keep the two
  in step.
- After a change, run `npm run build` and `npm test`. The live tests need a running sandbox with the Intro sample project; see
  `README.md`.

## Key conventions specific to this repository

- **Images:** screenshots are in `docs/media/` and pages set `:imagesdir: media/`. Retake screenshots when the sample content or
  UI they show has changed.
- **Naming:** the tutorial slug is `reactspa`. The sandbox is `tutorial_reactspa` (the CLI does not accept hyphens in
  sandbox names) and the frontend folder is
  `tutorial-reactspa-frontend`. The reader creates no Enonic application; the preinstalled Intro app keeps its ID
  `com.enonic.app.intro`.
- **Sample content:** the tutorial uses the `intro` project from the Intro template. Use the names and IDs that project
  actually returns in examples and links.

## Must-know rules even without the skill

- Every page in `docs/menu.json` has real content; add new pages to the menu.
- Wrap identifiers containing `_` in `+...+` outside source blocks.
- Use relative `<<path#,Label>>` links and never a `^` suffix.
- Only `.adoc` and `.json` files under `docs/` stay out of the published site; everything else becomes a page or a media item.
  A dot prefix does not exclude a file.
