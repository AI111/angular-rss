'use strict';

describe('Component: ChanelsComponent', function() {
  // load the controller's module
  beforeEach(module('angularRssApp.chanels'));

  var ChanelsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ChanelsComponent = $componentController('chanels', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
