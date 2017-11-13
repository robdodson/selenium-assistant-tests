const {setup, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<input type="color">', function() {
  beforeEach(async function() {
    fixture('input-color.html');
  });

  it('should match :-moz-focusring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  // Note: Skipping this test (though it currently passes) because it opens
  // a color picker dialog and I don't want it interfering with other tests.
  it.skip('should NOT match :-moz-focusring on mouse focus', async function() {
    await matchesMouse(false);
  });
});
