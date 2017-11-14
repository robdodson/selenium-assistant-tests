const {Key, By, until} = require('selenium-webdriver');
const expect = require('expect');

// Expected test results
const FOCUS_RING_STYLE = 'rgb(255, 0, 0)';

/**
 * Try the given callback function 3 times.
 * Helps prevent StaleElement errors in Selenium.
 * @param {*} callback 
 */
async function tryUntil(callback) {
  let retries = 3;
  let error;

  while(retries > 0) {
    try {
      await callback();
      return;
    } catch(err) {
      console.log('Oh No! There was an error!');
      retries = retries - 1;
      if (retries > 0) {
        console.log('Retrying...');
      }
      error = err;
    }
  }

  throw error;
}

/**
 * Load a test fixture HTML file to run assertions against.
 * @param {*} file 
 */
async function fixture(file) {
  let driver = global.__driver;
  await driver.get(`http://localhost:8080/${file}`);
  await tryUntil(async function() {
    let body = await driver.findElement(By.css('body'));
    await body.click();
  });
}

/**
 * Assert that the target element with the #el id responds to keyboard focus.
 * Can optionally take a `false` argument to indicate it should NOT match.
 * @param {*} shouldMatch 
 */
async function matchesKeyboard(shouldMatch = true) {
  let driver = global.__driver;
  await tryUntil(async function() {
    let body = await driver.findElement(By.css('body'));
    await body.sendKeys(Key.TAB);
  });
  let actual = await driver.executeScript(`
    return window.getComputedStyle(document.querySelector('#el')).outlineColor
  `);
  if (shouldMatch) {
    expect(actual).toEqual(FOCUS_RING_STYLE);
  } else {
    expect(actual).toNotEqual(FOCUS_RING_STYLE);
  }
}

/**
 * Assert that the target element with the #el id responds to mouse focus.
 * Can optionally take a `false` argument to indicate it should NOT match.
 * @param {*} shouldMatch 
 */
async function matchesMouse(shouldMatch = true) {
  let driver = global.__driver;
  await tryUntil(async function() {
    let element = await driver.findElement(By.css('#el'));
    await element.click();
  });
  let actual = await driver.executeScript(`
    return window.getComputedStyle(document.querySelector('#el')).outlineColor
  `);
  if (shouldMatch) {
    expect(actual).toEqual(FOCUS_RING_STYLE);
  } else {
    expect(actual).toNotEqual(FOCUS_RING_STYLE);
  }
}

module.exports = {
  FOCUS_RING_STYLE,
  fixture,
  matchesKeyboard,
  matchesMouse
};
