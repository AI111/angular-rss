'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/chanel/:id', {
      template: '<chanel id="chanel" flex layout="column" ></chanel>'
    });
}
