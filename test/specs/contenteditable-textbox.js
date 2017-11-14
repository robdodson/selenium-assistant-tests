const {fixture, matchesKeyboard, matchesMouse} = require('../spec-helpers');

describe('<div role="textbox" contenteditable="true">', function() {
  beforeEach(function() {
    return fixture('contenteditable-true.html');
  });

  // This test seems to fail because FF won't focus a div with contenteditable
  // if it's the first element on the page. Weird.
  // https://jsbin.com/cawevo/edit?html,output
  it.skip('should apply .focus-ring on keyboard focus', function() {
    return matchesKeyboard();
  });

  it.skip('should apply .focus-ring on mouse focus', function() {
    return matchesMouse();
  });
});
