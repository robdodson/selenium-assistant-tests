const {fixture, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<input type="file">', function() {
  beforeEach(async function() {
    // File input are weird...
    fixture('input-file.html');
  });

  it('should apply .focus-ring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it.skip('should NOT apply .focus-ring on mouse focus', async function() {
    await matchesMouse(false);
  });
});
