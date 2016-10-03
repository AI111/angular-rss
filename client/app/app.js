'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import ngMaterial from 'angular-material';
import ngMdIcons  from 'angular-material-icons';


const ngRoute = require('angular-route');

import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navDrawer from '../components/nav-drawer/nav.drawer.component';
import main from './main/main.component';
import chanels from './chanels/chanels.component';
import chanel from './chanel/chanel.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import pieChart from '../components/pie-chart/pie.chart.component';
import './app.css';

angular.module('angularFullstackApp', [ngCookies, ngResource, ngSanitize, ngRoute, ngMaterial, ngMdIcons, ngMessages,
 _Auth, account,
    admin, navDrawer, pieChart,  main, chanels, chanel, constants, util
  ])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['angularFullstackApp'], {
      strictDi: true
    });
  });
