const {fixture, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<input type="checkbox">', function() {
  beforeEach(function() {
    return fixture('input-checkbox.html');
  });

  it('should apply .focus-ring on keyboard focus', function() {
    return matchesKeyboard();
  });

  it('should NOT apply .focus-ring on mouse focus', function() {
    return matchesMouse(false);
  });
});
