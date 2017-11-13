const {setup, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<input type="time">', function() {
  beforeEach(async function() {
    fixture('input-time.html');
  });

  it('should match :-moz-focusring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it('should match :-moz-focusring on mouse focus', async function() {
    await matchesMouse();
  });
});
