# Playwright Test Suite — OrangeHRM Demo

A real Playwright test suite (TypeScript, Page Object Model) against the public
[OrangeHRM demo](https://opensource-demo.orangehrmlive.com), which OrangeHRM publishes
specifically for testing/automation practice (test credentials are shown on its own login page).

Same regression mindset as my Cypress work at [Zelifcam](https://github.com/kifzig/qa-portfolio) —
positive and negative cases, page objects instead of inline selectors, run in CI on every push.

## Structure

- `pages/` — Page Object Model classes (`LoginPage`, `DashboardPage`)
- `tests/login.spec.ts` — valid login, invalid-credentials error, empty-field validation
- `tests/dashboard.spec.ts` — dashboard widgets visible after login, logout flow
- `.github/workflows/playwright.yml` — runs the suite on every push/PR to main

## Running locally

```
npm install
npx playwright install --with-deps   # first time only
npm test              # headless, all browsers
npm run test:headed   # watch it run in a real browser window
npm run report        # view the last HTML report
```

## A note on flakiness

This suite runs against a shared public demo instance, not an app under our control.
Running multiple workers/browsers in parallel caused collisions on shared session state
there (login redirecting back to the login page instead of the dashboard). The config
runs serialized (`workers: 1`, `fullyParallel: false`) to avoid that — a real constraint
of testing against a shared environment, not a bug in the tests.
