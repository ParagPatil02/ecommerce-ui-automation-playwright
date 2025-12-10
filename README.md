
UI Automation Framework – Playwright + TypeScript

This repository contains a production-style UI automation framework built using Playwright Test (TypeScript).
It automates key flows of a demo e-commerce web application, covering login, product browsing, cart management, and checkout.

The framework emphasizes clean architecture, maintainability, configurability, reusability, and scalability for CI pipelines.

🎯 Tool & Technology Choice
Chosen Tool: Playwright Test (TypeScript)
Why Playwright?

Built-in parallelism, test runner & fixtures

Auto-wait, stable locators, test isolation

Screenshots, videos, traces automatically captured on failure

Expertise-friendly: supports Chromium, Firefox, WebKit

Excellent for CI pipelines and modern testing standards

🛒 Application Under Test (AUT)

URL: https://www.saucedemo.com/

Reason for choosing SauceDemo

Public, stable demo e-commerce application

Includes all required flows:

Login

Product listing + sorting

Cart

Checkout with user form

Rich enough to simulate real-life automation challenges

📁 Project Structure
marsdevs-automation-qa/
├─ package.json
├─ playwright.config.ts
├─ README.md
├─ src/
│  ├─ config/
│  │  ├─ dev.env.ts
│  │  └─ qa.env.ts
│  ├─ fixtures/
│  │  └─ loginData.ts
│  ├─ pages/
│  │  ├─ base.page.ts
│  │  ├─ login.page.ts
│  │  ├─ products.page.ts
│  │  ├─ cart.page.ts
│  │  └─ checkout.page.ts
│  └─ utils/
│     └─ helpers.ts
├─ tests/
│  ├─ login.spec.ts
│  ├─ products-cart.spec.ts
│  └─ checkout.spec.ts
├─ sample-report/
└─ .github/
   └─ workflows/
      └─ ci.yml

⚙️ Installation & Setup
1️⃣ Install dependencies
npm install

2️⃣ Install Playwright browsers
npx playwright install

▶️ Running Tests
Run complete test suite
npm test

Run in headed mode
npm run test:headed

Run smoke tests only
npm run test:smoke

🌎 Environment Management

The framework supports multiple environments: dev & qa.

Default environment = dev
Run tests against QA environment
ENV=qa npm test


You can update environment details inside:

src/config/dev.env.ts
src/config/qa.env.ts


Values such as:

Base URL

Username / Password

Environment name

🧪 How the Framework Works
✔ Page Object Model (POM)

Each page of the AUT gets its own class:

LoginPage

ProductsPage

CartPage

CheckoutPage

Benefits:

No locators inside tests

Reusable UI actions

Cleaner test code

📊 Data-Driven Testing

Negative login tests use array-driven test cases in:

src/fixtures/loginData.ts


The test loop dynamically executes scenarios with different username/password combinations.

⏱ Synchronization & Locators

This framework uses:

Playwright auto-waiting

Expect-based stable waits (expect(locator).toBeVisible())

Locators based on data-test attributes → stable and maintainable

🧩 Core Automated Flows
✔ Login scenarios

Successful login

Multiple invalid credential tests

Logout functionality

✔ Product listing

Sorting validation (price low→high, alphabetical)

✔ Cart

Add 3 products

Validate item name & price

Remove item and verify cart count

✔ Checkout

Fill user details

Validate order summary

Validate total

Successful confirmation screen

✔ Form validation

Missing first/last name

Missing postal code

📽 Reporting

Playwright automatically generates:

HTML reports

Screenshots on failure

Videos on failure

Trace files

Show report
npm run test:report


A saved example is stored inside:

sample-report/

🤖 CI/CD Integration (GitHub Actions)

A ready pipeline exists at:

.github/workflows/ci.yml


It performs:

Dependency installation

Browser installation

Headless Playwright test execution

Uploading HTML report as an artifact

This simulates a real-world CI setup used in enterprise QA automation.

🧱 Framework Design Choices (Brief Summary)
✔ Page Object Model

Ensures modular, clean, maintainable code.

✔ Config-driven

Base URL, credentials, browsers, environment selection — all externalized.

✔ Test Data Separation

Data-driven approach for login tests.

✔ Multi-browser Support

Chromium, Firefox, WebKit enabled.

✔ Automatic waits

No hard sleeps — reliable tests.

✔ Independent Tests

Each test sets up its own state.

✔ Tags

Tests grouped using @smoke, @regression.

▶️ Browser Selection

Browsers are configured in:

playwright.config.ts


Enabled projects:

Chromium

Firefox

WebKit

To run only Chromium:

npx playwright test --project=Chromium
