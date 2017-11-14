const {fixture, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('[tabindex=0]', function() {
  beforeEach(async function() {
    // Note: For focus to enter the page properly with this fixture I had
    // to make sure the div had some width/height.
    // This seems like a geckodriver bug.
    fixture('tabindex-zero.html');
  });

  it('should apply .focus-ring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it('should NOT apply .focus-ring on mouse focus', async function() {
    await matchesMouse(false);
  });
});
