const {fixture, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<input type="text">', function() {
  beforeEach(async function() {
    fixture('input-text.html');
  });

  it('should apply .focus-ring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it('should apply .focus-ring on mouse focus', async function() {
    await matchesMouse();
  });
});
