const {setup, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<button>', function() {
  beforeEach(async function() {
    await setup(this.driver, 'button.html');
  });

  it('should match :-moz-focusring on keyboard focus', async function() {
    await matchesKeyboard(this.driver);
  });

  it('should NOT match :-moz-focusring on mouse focus', async function() {
    await matchesMouse(this.driver, false);
  });
});
