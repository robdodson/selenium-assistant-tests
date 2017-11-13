const {fixture, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<button>', function() {
  beforeEach(async function() {
    await fixture('button.html');
  });

  it('should match :focus-ring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it('should NOT match :focus-ring on mouse focus', async function() {
    await matchesMouse(false);
  });
});
