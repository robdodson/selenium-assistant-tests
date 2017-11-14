const {Key, By, until} = require('selenium-webdriver');
const expect = require('expect');
const driver = global.__driver;

// Expected test results
const FOCUS_RING_STYLE = 'rgb(255, 0, 0)';

async function doAThing(cb) {
  let retries = 3;
  let error;

  while(retries > 0) {
    try {
      await cb();
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

async function fixture(file) {
  await driver.get(`http://localhost:8080/${file}`);
  await doAThing(async function() {
    let body = await driver.findElement(By.css('body'));
    await body.click();
  });
}

async function matchesKeyboard(shouldMatch = true) {
  await doAThing(async function() {
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

async function matchesMouse(shouldMatch = true) {
  await doAThing(async function() {
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
