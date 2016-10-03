'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './chanel.routes';
import {
  DialogConrtoller
} from './dialog.controller';

export class ChanelComponent {
  $http;
  $log;
  $routeParams;
  $mdSidenav;
  chanel = {};
  jsonFeeds = {};
  id: string;
  $mdDialog;
  title: string;
  rssToJsonParser = 'https://rss2json.com/api.json?rss_url=';

  /*@ngInject*/
  constructor($http, $log, $mdSidenav, $routeParams, $mdDialog) {
    this.$log = $log;
    this.$http = $http;
    this.$mdSidenav = $mdSidenav('left');
    this.$routeParams = $routeParams;
    this.$mdDialog = $mdDialog;
    this.authors;
  }
  $onInit() {
    this.id = this.$routeParams.id;
    this.$log.debug('init chanel page', this.id);
    this.getData();
  }
  getAutors(feeds){
    let set = new Set();
    feeds.forEach(f =>{
      if(f.author.length>0)set.add(f.author);
    });
    return set;
  }
  getData() {
    this.getChanel(this.id)
      .then(res => {
        this.chanel = res.data;
        this.$log.debug('response ', this.chanel);
        this.convertChanel(res.data.feed)
          .then(res => {
            this.jsonFeeds = res.data;
            this.$log.debug('jsonFeed', this.jsonFeeds);
            this.title = this.jsonFeeds.feed.title || 'Feed';
            this.authors=this.getAutors(this.jsonFeeds.items);
          })
      })
  }
  getChanel(id: string) {
    return this.$http.get('/api/chanels/' + id);
  }
  convertChanel(url: string) {
    return this.$http.get(this.rssToJsonParser + url);
  }
  toggleSideNav() {
    this.$log.debug('toggleSideNav');
    this.$mdSidenav.toggle();
  }
  onMesurStat(ev, text: string) {
    this.$log.debug('onMesurStat');
    let $http = this.$http;
    this.$mdDialog.show({
        locals: {
          Text: text
        },
        controller: DialogConrtoller,
        controllerAs: 'dialogCtrl',
        template: require('./feed.statistic.dialog.html'),
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: true // Only for -xs, -sm breakpoints.
      })
      .then((answer) => {
        // $scope.status = 'You said the information was "' + answer + '".';
        this.$log.debug('addRoom answer', answer);
      }, () => {
        // $scope.status = 'You cancelled the dialog.';
      });
  }
}

export default angular.module('angularRssApp.chanel', [ngRoute])
  .config(routes)
  .component('chanel', {
    template: require('./chanel.html'),
    controller: ChanelComponent,
    controllerAs: 'chanelCtrl'
  })
  .name;
