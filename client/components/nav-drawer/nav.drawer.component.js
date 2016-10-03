'use strict';
const angular = require('angular');

export class navDrawerComponent {
  authMenu=[
            {
              title: 'Login',
              path: '/login',
              visible : () => {
                return !this.isLoggedIn();
              },
              icon: '/assets/icons/ic_login_24px.svg'
            },
            {
              title: 'Logout',
              path: '/logout',
               visible :()=>{
                return this.isLoggedIn();
              },
              icon: '/assets/icons/ic_logout_24px.svg'
            },
            {
              title: 'Setting',
              path: '/settings',
               visible :()=>{
                return this.isLoggedIn();
              },
              icon: '/assets/icons/ic_settings_black_24px.svg'
            },
            {
              title: 'Signup',
              path: '/signup',
               visible : ()=> {
                return !this.isLoggedIn();
              },
              icon: '/assets/icons/ic_assignment_ind_black_24px.svg'
            },
            {
              title: 'Admin',
              path: '/admin',
               visible : ()=> {
                return this.isAdmin();
              },
              icon: '/assets/icons/ic_assignment_ind_black_24px.svg'
            }
  ];
  menu = [
          {
            title: 'Home',
            path: '/',
            icon: '/assets/icons/ic_home_24px.svg'
          },
          {
            title: 'Chanels',
            path: '/chanels',
            icon: '/assets/icons/ic_note_black_24px.svg'
          }
  ];

  $location;
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;

  constructor($location, Auth) {
    'ngInject';

    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

export default angular.module('angularRssApp.navDrawer', [])
  .component('navDrawer', {
    template: require('./naw.drawer.html'),
    controller: navDrawerComponent
  })
  .name;
