
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint no-console: ["off"] */
const http = require('http');
const fs = require('mz/fs');
const path = require('path');
const seleniumAssistant = require('selenium-assistant');
const Mocha = require('mocha');

/**
 * `browserFilter` is used as an argument to `Array.prototype.filter` to filter
 * which browsers are used to run the tests.
 */
function browserFilter(browser) {
  return browser.getReleaseName() === 'stable'
    && ['chrome'].includes(browser.getId());
}

/**
 * `buildMocha` builds a new instance of the Mocha test runner that has sourced
 * all the test files.
 * @returns A promise that resolves when Mocha is ready to run.
 */
async function buildMocha() {
  const mocha = new Mocha();
  const specs = await fs.readdir('./test/specs');
  specs.map(spec => mocha.addFile(path.join(__dirname, 'test/specs', spec)));
  mocha.suite.timeout(60000);
  return new Promise(resolve => mocha.loadFiles(resolve))
    .then(_ => mocha);
}

async function main() {
  // - Open all stable browsers and get their webdriver.
  const drivers =
    await Promise.all([
      ...seleniumAssistant.getLocalBrowsers()
        .filter(browserFilter)
        .map(browser => {
          const driver = browser.getSeleniumDriver();
          driver.manage().timeouts().setScriptTimeout(60000);
          return driver;
        }),
    ]);

  await runTests(drivers);

  console.log('Killing all browser instances...');
  await Promise.all(
    drivers.map(driver => seleniumAssistant.killWebDriver(driver))
  );
  console.log('Done.');
}

function runMocha(mocha) {
  return new Promise((resolve, reject) =>
    mocha.run(code =>
      code === 0?resolve():reject('Some tests failed')
  ));
}

async function runTests(drivers) {
  // Walk through all our drivers and run the suite on each of them.
  // We use `reduce()` to build a promise chain, which ensures that the tests
  // are run sequentially.
  return drivers
    .reduce(
      async (chain, driver) => {
        await chain;
        const mocha = await buildMocha();
        // Inject driver and server address into the test context
        mocha.suite.suites.forEach(s => {
          s.ctx.driver = driver;
        });
        await runMocha(mocha).then(_ => {});
      },
      Promise.resolve()
    );
}

main()
  .then(process.exist)
  .catch(err => {
    console.error(err);
    if (err.stack) {
      console.error(err.stack);
    }
    process.exit(1);
  });
