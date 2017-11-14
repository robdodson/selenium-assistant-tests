const {fixture, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<select size="3">', function() {
  beforeEach(async function() {
    fixture('select-size.html');
  });

  it('should apply .focus-ring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it('should NOT apply .focus-ring on mouse focus', async function() {
    await matchesMouse(false);
  });
});
