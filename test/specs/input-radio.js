const {fixture, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<input type="radio">', function() {
  beforeEach(async function() {
    fixture('input-radio.html');
  });

  it('should apply .focus-ring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it('should NOT apply .focus-ring on mouse focus', async function() {
    await matchesMouse(false);
  });
});
