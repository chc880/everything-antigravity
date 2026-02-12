---
description: Generate and run end-to-end tests with Playwright. Creates test journeys, captures screenshots/videos.
---

# E2E Testing

Generate and run end-to-end tests for critical user flows using Playwright.

## Workflow Steps

1. **Identify Critical Flows** — Determine the most important user journeys
2. **Write Test Specs** — Create Playwright test files
3. **Run Tests** — Execute tests with screenshots and traces
4. **Review Results** — Analyze test output and fix failures

## Setup

```bash
# Install Playwright
npm init playwright@latest

# Or add to existing project
npm install -D @playwright/test
npx playwright install
```

## Test Structure

```typescript
import { test, expect } from '@playwright/test'

test.describe('User Authentication', () => {
  test('can login successfully', async ({ page }) => {
    await page.goto('/login')
    await page.fill('[name="email"]', 'user@example.com')
    await page.fill('[name="password"]', 'password')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/dashboard')
  })
})
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run with UI
npx playwright test --ui

# Run specific file
npx playwright test tests/auth.spec.ts

# Run with trace
npx playwright test --trace on
```

## Best Practices

1. Use semantic selectors (`getByRole`, `getByText`) over CSS selectors
2. Add `data-testid` attributes for test-specific elements
3. Test critical user flows, not every UI detail
4. Use page objects for reusable interactions
5. Run tests in CI/CD pipeline
