const {setup, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<input type="radio">', function() {
  beforeEach(async function() {
    fixture('input-radio.html');
  });

  it('should match :-moz-focusring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it('should NOT match :-moz-focusring on mouse focus', async function() {
    await matchesMouse(false);
  });
});
