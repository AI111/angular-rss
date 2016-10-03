'use strict';

describe('Component: navDrawer', function() {
  // load the component's module
  beforeEach(module('angularRssApp.nav-drawer'));

  var navDrawerComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    navDrawerComponent = $componentController('navDrawer', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
