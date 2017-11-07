const expect = require('expect');
const {Key, By} = require('selenium-webdriver');

// Expected test results
const FOCUS_RING_STYLE = 'rgb(255, 0, 0)';

let body;
let element;

describe('<input type="text">', function() {
  beforeEach(async function() {
    await this.driver.get(`http://localhost:8080/input-text.html`);
    body = await this.driver.findElement(By.css('body'));
    element = await this.driver.findElement(By.css('#el'));
    await body.click();
  });

  it('should match :-moz-focusring on keyboard focus', async function() {
    await body.sendKeys(Key.TAB);
    let actual = await this.driver.executeScript(`
      return window.getComputedStyle(document.querySelector('#el')).outlineColor
    `);
    expect(actual).toEqual(FOCUS_RING_STYLE);
  });

  it('should match :-moz-focusring on mouse focus', async function() {
    await element.click();
    let actual = await this.driver.executeScript(`
      return window.getComputedStyle(document.querySelector('#el')).outlineColor
    `);
    expect(actual).toEqual(FOCUS_RING_STYLE);
  });
});
