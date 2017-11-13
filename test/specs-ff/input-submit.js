const {setup, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<input type="submit">', function() {
  beforeEach(async function() {
    fixture('input-submit.html');
  });

  it('should match :-moz-focusring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it('should NOT match :-moz-focusring on mouse focus', async function() {
    await matchesMouse(false);
  });
});
