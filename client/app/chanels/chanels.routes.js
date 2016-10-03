'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/chanels', {
      template: '<chanels flex layout="column"></chanels>'
    });
}
