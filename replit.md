# Workspace

## Overview

Static recreation of the legacy LV= CLANAD (Client Annuity Administration System) presented in the **LVE Component Library design system**. Single-page React app, no backend, ready for static deployment.

## Stack

- pnpm workspaces · TypeScript 5.9
- React + Vite (artifact: `lv-clanad`)
- TailwindCSS v4
- react-icons/md (Material Design Line Icons — exclusive icon library)
- Google Fonts: **Livvic** (headers/buttons/tabs) + **Mulish** (body/inputs)

## LVE Design System Tokens

Set as theme colors in `src/index.css`:

- Primary `#006cf4`, Hover `#003578`
- Navy `#00263e` (header), Dark Navy `#002f5c` (data grid)
- Link Blue `#005a9c`, Secondary `#04589b`, Highlight `#05579B`
- Green `#178830` (focus border), Error `#d72714`
- Tab Inactive `#eaf5f8`, Page bg `#f0f0f0`
- Border radius pill: `30px`, input/panel: `8px`

Mandatory page shell (`min-h-screen flex flex-col bg-[#f0f0f0]`):
- `<Header>` — navy bar, LV logo + Logout + divider + page title
- `<main className="flex-1 px-[142px] py-8">…</main>`
- `<Footer>` — white bar, logo + address (sticks to bottom via `mt-auto`)

## Artifacts

- `artifacts/lv-clanad` (`/`): The CLANAD client app — 13 tabs in the original layout (Application Details, Annuitant(s), Policy, Bank Acc, Payments, Increase History, Quote Details, Diary & Audit Trail, Notes, Letters, Events, Maturities/Surrender, LOA/POA), restyled with the LVE component library.

## Notes

- All data is hard-coded sample data taken from the reference screenshots — no API calls, fully static.
- LV logo lives at `src/assets/lv-logo.png` and is imported directly by `Header`/`Footer`.
