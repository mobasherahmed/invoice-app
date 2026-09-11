# Invoice App — Angular 17 standalone, dynamic forms and role-based access

An invoice manager built to exercise the two things that break most Angular
forms work at scale: nested, variable-length line items, and authorization that
has to hold at both the route and the control level.

**Stack:** Angular 17 (standalone components) · TypeScript · Reactive Forms with `FormArray` · Express + JWT · `ngx-toastr` · SCSS

---

## What it demonstrates

**Dynamic line items.** An invoice holds an arbitrary number of items, each with
its own quantity and price, built as a `FormArray` of nested groups with totals
derived from the form rather than tracked in parallel state — so there is one
source of truth and no resync bug to chase.

**Role-based actions.** Authentication is JWT over a small Express API; an
`authGuard` protects routes and the same role drives which actions render, so
admin-only create, update and delete are enforced in both places rather than
hidden in the UI alone.

**Feature-first structure.**

```
src/app
├── auth/       login component, auth service
├── invoices/   components, pages, services, interfaces, pipes
└── shared/     modal, sidebar, guards, theme and UI services
```

Each feature owns its own interfaces and service; `shared` holds only what more
than one feature genuinely needs. Filtering by payment status runs through a
dedicated pipe, and theme switching (dark/light) sits in a service rather than
in component state, so it survives navigation.

## Features

- Create, view, update and delete invoices, with items, quantities, prices, payment status and payment type
- Admin-only update and delete
- Filter by status — pending, draft, paid
- Multiple users, authentication and authorization
- Dark and light mode
- Responsive layout and animations

## Running it

```bash
npm install
node server.js     # JSON-file API
npm start          # app on :4200
```

Seed users are in the assets JSON file — log in with one of those.

---

Part of my public work — see [my profile](https://github.com/mobasherahmed) and
[engineering case studies](https://mobasherahmed.github.io/Portfolio/en).
