const {setup, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<select size="3">', function() {
  beforeEach(async function() {
    fixture('select-size.html');
  });

  it('should match :-moz-focusring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it.skip('should NOT match :-moz-focusring on mouse focus', async function() {
    await matchesMouse(false);
  });
});
