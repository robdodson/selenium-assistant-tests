const {fixture, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<input type="range">', function() {
  beforeEach(async function() {
    // Range inputs are super weird. Probably need to explore styling
    // the internal pseudo elements.
    // https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
    fixture('input-range.html');
  });

  it('should apply .focus-ring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it('should NOT apply .focus-ring on mouse focus', async function() {
    await matchesMouse(false);
  });
});
