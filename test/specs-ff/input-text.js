const {setup, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<input type="text">', function() {
  beforeEach(async function() {
    fixture('input-text.html');
  });

  it('should match :-moz-focusring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it('should match :-moz-focusring on mouse focus', async function() {
    await matchesMouse();
  });
});
