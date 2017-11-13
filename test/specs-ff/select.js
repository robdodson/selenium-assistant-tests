const {setup, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<select>', function() {
  beforeEach(async function() {
    fixture('select.html');
  });

  it('should match :-moz-focusring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it.skip('should NOT match :-moz-focusring on mouse focus', async function() {
    await matchesMouse(false);
  });
});
