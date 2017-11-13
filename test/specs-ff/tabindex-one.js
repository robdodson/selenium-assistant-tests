const {setup, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('[tabindex=1]', function() {
  beforeEach(async function() {
    // Note: For focus to enter the page properly with this fixture I had
    // to make sure the div had some width/height.
    // This seems like a geckodriver bug.
    fixture('tabindex-one.html');
  });

  it('should match :-moz-focusring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it.skip('should NOT match :-moz-focusring on mouse focus', async function() {
    await matchesMouse(false);
  });
});
