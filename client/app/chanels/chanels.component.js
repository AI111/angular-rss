'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './chanels.routes';
import {ChanelDialogConrtoller} from './chanel.dialog.controller';

export class ChanelsComponent {
  $http;
  $log;
  $mdSidenav;
  $mdDialog;
  showSearch=false;
  groups = [];

  /*@ngInject*/
  constructor($http, $log, $mdSidenav,$mdDialog) {
    this.$mdDialog=$mdDialog;
    this.$http=$http;
    this.$log=$log;
    this.$mdSidenav=$mdSidenav('left');
    this.selectedIndex;
  }
  $onInit() {
    this.getGroups().then(res => {
      this.groups=res.data;
      this.$log.debug('get groups',this.groups);
    })
  }
  toggleSideNav(){
    this.$log.debug('toggleSideNav');
    this.$mdSidenav.toggle();
  }
  getGroups(){
    return this.$http.get('/api/users/me/groups');
  }

  addChanel(ev){
    this.$log.debug('addChanel');
    let $http = this.$http;
    this.$mdDialog.show({
      controller: ChanelDialogConrtoller,
      locals:{Groups: this.groups},
      controllerAs:'dialogCtrl',
      template: require('./chanel.create.dialog.html'),
      parent: angular.element(document.body),
      targetEvent:ev,
      clickOutsideToClose:true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    })
      .then((answer)=> {
        this.$log.debug('answer',answer);
        this.groups.forEach(g =>{
          if(g._id===answer.group) g.chanels.push(answer.chanel);
        })
        // this.groups.find((group) => {return group._id===answer.group}).chanels.add(answer.chanel);
        // $scope.status = 'You said the information was "' + answer + '".';
        this.$log.debug('addRoom answer',answer);
      }, ()=> {
        // $scope.status = 'You cancelled the dialog.';
      });
  }
  deleteChanel(ev,chanel,k){
    this.$log.debug('deleteChanel',chanel,this.selectedIndex,k);
    var confirm = this.$mdDialog.confirm()
      .title('Would you like to delete your chanel?')
      .ariaLabel('Lucky day')
      .targetEvent(ev)
      .ok('Delete!')
      .cancel('Cancle');

    this.$mdDialog.show(confirm).then(() => {
      this.$http.delete('/api/chanels/'+chanel._id)
        .then(res=> {this.$log.debug('delete chanel',res);
          this.groups[this.selectedIndex].chanels.splice(k,1);
        })
        .catch(err=> this.$log.error('delete chanel err',err))
    }, function() {

    });
  }
  addGroupe(ev){
    this.$log.debug('addGroupe');
    var confirm = this.$mdDialog.prompt()
      .title('Create group of chanels')
      .textContent('Enter a group name.')
      .placeholder('Name')
      .ariaLabel('Name')
      .targetEvent(ev)
      .ok('Okay!')
      .cancel('Cancle');

    this.$mdDialog.show(confirm).then((result)=> {
      this.$log.debug('create dialog',result);
      //$scope.status = 'You decided to name your dog ' + result + '.';
      this.$http.post('/api/users/me/groups',{name:result})
        .then(res =>{
          this.groups.push(res.data);
        })
        .catch(err =>{
          this.$log.error('delete chanel err',err)
        })
    }, function() {
      //$scope.status = 'You didn\'t name your dog.';
    });
  }
  deleteGroupe(ev){
    var group = this.groups[this.selectedIndex];
    this.$log.debug('deleteGroupe',group,this.selectedIndex);
    var confirm = this.$mdDialog.confirm()
      .title('Would you like to delete your groupe '+group.name+'?')
      .ariaLabel('Lucky day')
      .targetEvent(ev)
      .ok('Delete!')
      .cancel('Cancle');

    this.$mdDialog.show(confirm).then(() => {
      this.$http.delete('/api/users/me/groups/'+group._id)
        .then(res=> {this.$log.debug('delete chanel',res);
          this.groups.splice(this.selectedIndex,1);
        })
        .catch(err=> this.$log.error('delete chanel err',err))
    }, function() {

    });
  }
}

export default angular.module('angularRssApp.chanels', [ngRoute])
  .config(routes)
  .component('chanels', {
    template: require('./chanels.html'),
    controller: ChanelsComponent
  })
  .name;
