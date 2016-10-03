'use strict';
const angular = require('angular');

/*@ngInject*/
export function DialogConrtoller($log, $mdDialog, Text, $mdMedia) {
  console.log('onInit', Text);
  this.text = Text;


  if ($mdMedia('xs')) {
    this.chart = {
      w: 300,
      h: 300
    }
  } else if ($mdMedia('sm')) {
    this.chart = {
      w: 550,
      h: 550
    }

  } else if ($mdMedia('md')) {
    this.chart = {
      w: 600,
      h: 600
    }

  } else if ($mdMedia('lg')) {
    this.chart = {
      w: 650,
      h: 650
    }

  } else if ($mdMedia('xl')) {
    this.chart = {
      w: 800,
      h: 800
    }
  }

  let xsmall = $mdMedia('xs');
  $log.debug('size xsm', xsmall);

  let small = $mdMedia('sm');
  $log.debug('size sm', small);

  let midle = $mdMedia('md');
  $log.debug('size md', midle);

  let large = $mdMedia('lg');
  $log.debug('size lg', large);

  let xlarge = $mdMedia('xl') || {
    w: 900,
    h: 900
  };
  $log.debug('x large size', xlarge);


  $log.debug('size', this.chart);





  this.$onInit = () => {
    console.log('onInit');
  };
  // constructor($mdDialog,$log,text){
  // 	this.$mdDialog=$mdDialog;
  // 	this.$log=$log;
  // 	this.$log.debug('RoomDialogCtrl',text);
  // }
  this.cancel = ($event) => {
    $log.debug('RoomDialogCtrl cancel');
    $mdDialog.cancel();
  }
  this.create = ($event) => {
    this.$log.debug('create', this.name, this.asyncContacts);
    // this.$mdDialog.hide({name:this.name,users:this.asyncContacts.map(user=>{return user._id})});
  }
}
export default angular.module('angularRssApp.chanel', [])
  .controller('DialogConrtoller', DialogConrtoller)
  .name;
