'use strict';

describe('Component: pieChart', function() {
  // load the component's module
  beforeEach(module('angularRssApp.pie-chart'));

  var pieChartComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    pieChartComponent = $componentController('pieChart', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
