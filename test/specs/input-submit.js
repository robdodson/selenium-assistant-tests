const {fixture, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<input type="submit">', function() {
  beforeEach(async function() {
    fixture('input-submit.html');
  });

  it('should apply .focus-ring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it.skip('should NOT apply .focus-ring on mouse focus', async function() {
    await matchesMouse(false);
  });
});
