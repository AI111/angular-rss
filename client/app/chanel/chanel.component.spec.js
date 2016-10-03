'use strict';

describe('Component: ChanelComponent', function() {
  // load the controller's module
  beforeEach(module('angularRssApp.chanel'));

  var ChanelComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ChanelComponent = $componentController('chanel', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
