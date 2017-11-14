const {fixture, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('[tabindex=-1]', function() {
  beforeEach(function() {
    // Note: For focus to enter the page properly with this fixture I had
    // to make sure the div had some width/height.
    // This seems like a geckodriver bug.
    return fixture('tabindex-negative-one.html');
  });

  it('should NOT apply .focus-ring on keyboard focus', function() {
    return matchesKeyboard(false);
  });

  it('should NOT apply .focus-ring on mouse focus', function() {
    return matchesMouse(false);
  });
});
