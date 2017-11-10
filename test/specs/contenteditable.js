const {setup, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<div contenteditable>', function() {
  beforeEach(async function() {
    await setup(this.driver, 'contenteditable.html');
  });

  // This test seems to fail because FF won't focus a div with contenteditable
  // if it's the first element on the page. Weird.
  // https://jsbin.com/cawevo/edit?html,output
  it.skip('should match :-moz-focusring on keyboard focus', async function() {
    await matchesKeyboard(this.driver);
  });

  it('should match :-moz-focusring on mouse focus', async function() {
    await matchesMouse(this.driver);
  });
});
