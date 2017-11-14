
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
const clearModule = require('clear-module');
let didTestsFail = false;

/**
 * Create a new instance of the Mocha test runner that has sourced
 * all the test files.
 * @returns A promise that resolves when Mocha is ready to run.
 */
async function getMocha() {
  const mocha = new Mocha();
  const specs = await fs.readdir(path.join(__dirname, 'test/specs'));
  specs.map(spec => {
    let filePath = path.join(__dirname, 'test/specs', spec);
    // Mocha adds state to its test files so they can't be run twice.
    // This will clear the test file from the cache so Mocha must request
    // a fresh copy.
    clearModule(filePath);
    mocha.addFile(filePath);
  });
  mocha.suite.timeout(60000);
  return mocha;
}

/**
 * `browserFilter` is used as an argument to `Array.prototype.filter` to filter
 * which browsers are used to run the tests.
 */
function browserFilter(browser) {
  return browser.getReleaseName() === 'stable'
    && ['firefox', 'chrome'].includes(browser.getId());
}

async function runTests(browsers) {
  for (let browser of browsers) {
    const driver = await browser.getSeleniumDriver();
    // Stash a copy of the browser's name so we can log it
    // during the tests
    driver.__prettyName = browser.getPrettyName();
    // I know what you're thinking...
    // But Mocha doesn't give me a good way to inject data into the runner so...
    global.__driver = driver;
    driver.manage().timeouts().setScriptTimeout(60000);
    const mocha = await getMocha();
    await runMocha(driver, mocha);
  }
}

/**
 * Run Mocha tests for each WebDriver instance.
 * @param {*} driver 
 * @param {*} mocha 
 */
function runMocha(driver, mocha) {
  return new Promise(function(resolve, reject) {
    console.log(`Running tests in ${driver.__prettyName}`);
    mocha.run(function(failures) {
      // Set a global flag to indicate that some tests failed. This way
      // the process doesn't immediately bail on the promise rejection.
      // Instead, we'll check this flag at the end of all the tests
      // and exit the process with a non-zero code.
      if (failures !== 0) {
        didTestsFail = true;
      }
      seleniumAssistant.killWebDriver(driver);
      resolve();
    })
  });
}

/**
 * Open all stable browsers and get their WebDriver instance.
 * Run tests, check for failures, and kill the process.
 */
async function main() {
  let browsers = seleniumAssistant.getLocalBrowsers().filter(browserFilter);
  await runTests(browsers);
  console.log('Done.');
}

/**
 * Do all the things!!!
 */
main()
  .then(function() {
    didTestsFail ? process.exit(1) : process.exit()
  })
  .catch(err => {
    console.error(err);
    if (err.stack) {
      console.error(err.stack);
    }
    process.exit(1);
  });
