const {fixture, FOCUS_RING_STYLE} = require('../spec-helpers');
const {Key, By} = require('selenium-webdriver');
const expect = require('expect');
const driver = global.__driver;

describe('<input type="radio"> group', function() {
  beforeEach(async function() {
    fixture('input-radio-group.html');
  });

  it('should apply .focus-ring on keyboard arrow key focus', async function() {
      let body = await driver.findElement(By.css('body'));
      let first = await driver.findElement(By.css('#first'));
      let element = await driver.findElement(By.css('#el'));
      await first.click();
      await first.sendKeys(Key.ARROW_DOWN);
      let actual = await driver.executeScript(`
        return window.getComputedStyle(document.querySelector('#el')).outlineColor
      `);
      expect(actual).toEqual(FOCUS_RING_STYLE);
  });

});
