# Workspace

## Overview

Static recreation of the legacy LV= CLANAD (Client Annuity Administration System) with a modern UI. Single-page React app, no backend, ready for static deployment.

## Stack

- pnpm workspaces · TypeScript 5.9
- React + Vite (artifact: `lv-clanad`)
- TailwindCSS v4
- lucide-react icons

## Artifacts

- `artifacts/lv-clanad` (`/`): The CLANAD client app — 13 tabs reproducing the original layout (Application Details, Annuitant(s), Policy, Bank Acc, Payments, Increase History, Quote Details, Diary & Audit Trail, Notes, Letters, Events, Maturities/Surrender, LOA/POA).

## Notes

- All data is hard-coded sample data taken from the reference screenshots — no API calls are made, the app can be published as a fully static site.
