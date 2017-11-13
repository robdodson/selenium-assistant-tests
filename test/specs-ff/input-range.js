const {setup, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<input type="range">', function() {
  beforeEach(async function() {
    // Range inputs are super weird. Probably need to explore styling
    // the internal pseudo elements.
    // https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
    fixture('input-range.html');
  });

  it('should match :-moz-focusring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it.skip('should NOT match :-moz-focusring on mouse focus', async function() {
    await matchesMouse(false);
  });
});
