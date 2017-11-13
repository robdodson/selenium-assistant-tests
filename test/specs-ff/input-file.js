const {setup, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<input type="file">', function() {
  beforeEach(async function() {
    // File input are weird...
    fixture('input-file.html');
  });

  it.skip('should match :-moz-focusring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it.skip('should match NOT :-moz-focusring on mouse focus', async function() {
    await matchesMouse(false);
  });
});
