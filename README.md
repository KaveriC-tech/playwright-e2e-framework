# Playwright E2E Automation Framework

![Playwright Tests](https://github.com/KaveriC-tech/playwright-e2e-framework/actions/workflows/playwright.yml/badge.svg)

End-to-end test automation framework built with **Playwright** and **JavaScript** using Page Object Model architecture, data-driven testing, and GitHub Actions CI integration.

---

## Tech Stack

- **Framework:** Playwright
- **Language:** JavaScript (Node.js)
- **Pattern:** Page Object Model (POM)
- **Test Data:** Data-driven via JSON fixtures
- **CI/CD:** GitHub Actions
- **Reporting:** Playwright HTML Reporter

---

## Project Structure
playwright-e2e-framework/
├── tests/
│   └── login.test.js       # Test cases for login functionality
├── pages/
│   └── LoginPage.js        # Page Object for login page
├── test-data/
│   └── users.json          # Test data (valid, locked, invalid users)
├── .github/
│   └── workflows/
│       └── playwright.yml  # GitHub Actions CI pipeline
├── playwright.config.js    # Playwright configuration
└── package.json
---

## Test Coverage

| Test Case | Status |
|-----------|--------|
| Valid user logs in successfully | ✅ |
| Locked out user sees error | ✅ |
| Invalid credentials show error | ✅ |
| Username field is required | ✅ |
| Password field is required | ✅ |

---

## How to Run Locally

**1. Clone the repo**
```bash
git clone https://github.com/KaveriC-tech/playwright-e2e-framework.git
cd playwright-e2e-framework
```

**2. Install dependencies**
```bash
npm install
npx playwright install
```

**3. Run all tests**
```bash
npm test
```

**4. Run on a specific browser**
```bash
npm run test:chrome
npm run test:firefox
```

**5. View HTML report**
```bash
npm run report
```

---

## CI/CD

Tests run automatically on every push and pull request to `main` via GitHub Actions. The full HTML report is uploaded as an artifact after every run.

---

## Author

**Kaveri C** — QA Automation Engineer  
[LinkedIn](https://www.linkedin.com/in/c-kaveri789/) • [GitHub](https://github.com/KaveriC-tech)
