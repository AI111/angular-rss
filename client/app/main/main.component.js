import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  $http;

  awesomeThings = [];
  newThing = '';

  /*@ngInject*/
  constructor($mdSidenav) {
    this.$mdSidenav=$mdSidenav('left')
    this.text=`Many commuters woke up on Friday to 445546 $%^&^&%^&%0 0809>? ./././f long and complicated commutes,
     facing a confusing slate of schedule changes, delays and cancellations 
     with a mixture of weariness, frustration and stoicism.`;
  }
  toggleSideNav(){
    this.$mdSidenav.toggle();
  }

 
}

export default angular.module('angularFullstackApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
