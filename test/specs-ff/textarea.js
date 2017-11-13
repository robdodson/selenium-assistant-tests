const {setup, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<textarea>', function() {
  beforeEach(async function() {
    fixture('textarea.html');
  });

  it('should match :-moz-focusring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it('should match :-moz-focusring on mouse focus', async function() {
    await matchesMouse();
  });
});
