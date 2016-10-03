'use strict';
const angular = require('angular');

/*@ngInject*/
export function  ChanelDialogConrtoller($http, $log,$mdDialog,Groups){

	console.log('onInit',Groups);
	this.groups=Groups;
	this.chanel={
		feed:'http://www.pravda.com.ua/rss/',
		group:''
	}
	this.selectedGroup;
	this.$onInit = () => {
		console.log('onInit');
	};
	// constructor($mdDialog,$log,text){
	// 	this.$mdDialog=$mdDialog;
	// 	this.$log=$log;
	// 	this.$log.debug('RoomDialogCtrl',text);
	// }
	this.cancel = ($event) => {
		$log.debug('RoomDialogCtrl cancel',this.groups);
		$mdDialog.cancel();
	}

	this.create = ($event) => {
	  console.log('create');
    $log.debug('create',this.chanel);
		$http.post('/api/groups/'+this.chanel.group+'/chanels',{feed:this.chanel.feed})
		.then(res =>{
			$log.debug(res);
			$mdDialog.hide({group:this.chanel.group, chanel:res.data});
		}).catch(err=>{
			$log.debug(err);
		});
		// this.$mdDialog.hide({name:this.name,users:this.asyncContacts.map(user=>{return user._id})});
	}
	this.sChecked = (err) => {
		this.$log.debug('sChecked',err);
		return !angular.equals({}, err);
	}
}
export default angular.module('angularRssApp.chanels',[])
.controller('ChanelDialogConrtoller', ChanelDialogConrtoller)
.name;
