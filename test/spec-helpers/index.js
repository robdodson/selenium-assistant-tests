const {Key, By} = require('selenium-webdriver');
const expect = require('expect');

// Expected test results
const FOCUS_RING_STYLE = 'rgb(255, 0, 0)';

async function setup(driver, fixture) {
  await driver.get(`http://localhost:8080/${fixture}.html`);
  let body = await driver.findElement(By.css('body'));
  await body.click();
}

async function matchesKeyboard(driver, shouldMatch = true) {
  let body = await driver.findElement(By.css('body'));
  let element = await driver.findElement(By.css('#el'));
  await body.sendKeys(Key.TAB);
  let actual = await driver.executeScript(`
    return window.getComputedStyle(document.querySelector('#el')).outlineColor
  `);
  if (shouldMatch) {
    expect(actual).toEqual(FOCUS_RING_STYLE);
  } else {
    expect(actual).toNotEqual(FOCUS_RING_STYLE);
  }
}

async function matchesMouse(driver, shouldMatch = true) {
  let element = await driver.findElement(By.css('#el'));
  await element.click();
  let actual = await driver.executeScript(`
    return window.getComputedStyle(document.querySelector('#el')).outlineColor
  `);
  if (shouldMatch) {
    expect(actual).toEqual(FOCUS_RING_STYLE);
  } else {
    expect(actual).toNotEqual(FOCUS_RING_STYLE);
  }
}

module.exports = { setup, matchesKeyboard, matchesMouse };
