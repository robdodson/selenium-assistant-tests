const {setup, FOCUS_RING_STYLE} = require('../spec-helpers');
const {Key, By} = require('selenium-webdriver');
const expect = require('expect');

describe('<input type="radio"> group', function() {
  beforeEach(async function() {
    fixture('input-radio-group.html');
  });

  it('should match :-moz-focusring on keyboard arrow key focus', async function() {
      let body = await this.driver.findElement(By.css('body'));
      let first = await this.driver.findElement(By.css('#first'));
      let element = await this.driver.findElement(By.css('#el'));
      await first.click();
      await first.sendKeys(Key.ARROW_DOWN);
      let actual = await this.driver.executeScript(`
        return window.getComputedStyle(document.querySelector('#el')).outlineColor
      `);
      expect(actual).toEqual(FOCUS_RING_STYLE);
  });

});
