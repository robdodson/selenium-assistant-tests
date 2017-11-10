const {setup, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('select', function() {
  beforeEach(async function() {
    await setup(this.driver, 'select-size.html');
  });

  it('should match :-moz-focusring on keyboard focus', async function() {
    await matchesKeyboard(this.driver);
  });

  it.skip('should NOT match :-moz-focusring on mouse focus', async function() {
    await matchesMouse(this.driver, false);
  });
});
