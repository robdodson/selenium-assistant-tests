const {fixture, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<textarea>', function() {
  beforeEach(async function() {
    fixture('textarea.html');
  });

  it('should apply .focus-ring on keyboard focus', async function() {
    await matchesKeyboard();
  });

  it('should apply .focus-ring on mouse focus', async function() {
    await matchesMouse();
  });
});
