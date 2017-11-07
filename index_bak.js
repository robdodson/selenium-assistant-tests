const expect = require('expect');
const chalk = require('chalk');
const seleniumAssistant = require('selenium-assistant');
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const Key = webdriver.Key;

// Expected test results
const EXPECTED_OUTLINE = 'rgb(255, 0, 0)';

async function main() {
  const browsers = seleniumAssistant.getLocalBrowsers();
  let browser = browsers.find(browser => browser.getPrettyName() === 'Firefox Stable');
  let driver = await browser.getSeleniumDriver();
  await testButton(driver);
  await testInput(driver);
  return seleniumAssistant.killWebDriver(driver);
}

async function testButton(driver) {
  await driver.get('http://localhost:8080/button.html');
  let body = await driver.findElement(By.css('body'));
  let element = await driver.findElement(By.css('#el'));
  await body.click();
  await body.sendKeys(Key.TAB);
  let actual = await driver.executeScript(`
    return window.getComputedStyle(document.querySelector('#el')).outlineColor
  `);
  expect(actual).toEqual(EXPECTED_OUTLINE, '<button> matches :-moz-focusring');
}

async function testInput(driver) {
  await driver.get('http://localhost:8080/input-text.html');
  let body = await driver.findElement(By.css('body'));
  let element = await driver.findElement(By.css('#el'));
  await body.click();
  await body.sendKeys(Key.TAB);
  let actual = await driver.executeScript(`
    return window.getComputedStyle(document.querySelector('#el')).outlineColor
  `);
  expect(actual).toEqual(EXPECTED_OUTLINE, '<input type=text> matches :-moz-focusring');
}

// Handle failing assertions and log to the console.
process.on('unhandledRejection', error => {
  console.log(error);
  console.error(`${chalk.bgRed('Failed')}  : ${error.message}`);
  console.error(`${chalk.red('Actual')}  : ${error.actual}`);
  console.error(`${chalk.green('Expected')}: ${error.expected}`);
});

main().then(process.exit);
