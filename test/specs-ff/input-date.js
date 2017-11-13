const {setup, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<input type="date">', function() {
  beforeEach(async function() {
    fixture('input-date.html');
  });

  it('should match :-moz-focusring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it('should match :-moz-focusring on mouse focus', async function() {
    await matchesMouse();
  });
});
