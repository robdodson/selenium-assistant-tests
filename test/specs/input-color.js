const {fixture, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<input type="color">', function() {
  beforeEach(async function() {
    fixture('input-color.html');
  });

  it('should apply .focus-ring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  // Note: Skipping this test (though it currently passes) because it opens
  // a color picker dialog and I don't want it interfering with other tests.
  it.skip('should NOT apply .focus-ring on mouse focus', async function() {
    await matchesMouse(false);
  });
});
