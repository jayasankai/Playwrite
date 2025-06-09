# Playwrite

A project to demonstrate basic console commands for creating, running, and debugging your application.

## Getting Started

### 1. Workspace setup
```bash
npm init playwright@latest
```

### 2. Install Dependencies
```bash
npm install
```
### 3. Configure Environment Variables

Create a `.env` file in the project root or `tests` directory with your credentials:

```
USERNAME=your_wikipedia_username
PASSWORD=your_wikipedia_password
```

### 4. Run Tests

To execute all Playwright tests:

```bash
npx playwright test
```

### 5. View Test Report

After running tests, view the HTML report:

```bash
npx playwright show-report
```

### 6. Debugging

To run a test in headed mode with debugging:

```bash
npx playwright test --debug
```

---

## Project Structure

- `tests/` - Contains all test files (`*.spec.ts`, `*.setup.ts`)
- `playwright.config.ts` - Playwright configuration
- `storageStatePath.ts` - Shared storage state path constant

---

## Useful Commands

- Run a specific test file:
  ```bash
  npx playwright test tests/your-test.spec.ts
  ```
- Update Playwright browsers:
  ```bash
  npx playwright install
  ```
- Open Playwright Inspector:
  ```bash
  PWDEBUG=1 npx playwright test
  ```

---

For more information, see the [Playwright documentation](https://playwright.dev/docs/intro).
