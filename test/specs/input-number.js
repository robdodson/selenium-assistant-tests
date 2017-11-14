const {fixture, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<input type="number">', function() {
  beforeEach(function() {
    return fixture('input-number.html');
  });

  it('should apply .focus-ring on keyboard focus', function() {
    return matchesKeyboard();
  });

  it('should apply .focus-ring on mouse focus', function() {
    return matchesMouse();
  });
});
