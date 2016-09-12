/**
* angular-starter-kit
*
* @author Andrea SonnY <andreasonny83@gmail.com>
* @copyright 2016 Andrea SonnY <andreasonny83@gmail.com>
*
* This code may only be used under the MIT style license.
*
* @license MIT  https://andreasonny.mit-license.org/@2016/
*/
(function() {
  'use strict';

  angular
    .module('app', [
      'ui.router',
      'ngAnimate',
      'ngMaterial'
    ])
    .config(config)
    .run(run);

  // safe dependency injection
  // this prevents minification issues
  config.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider'
  ];

  /**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   *
   * @param  {Object} $stateProvider     $stateProvider Angular service
   * @param  {Object} $urlRouterProvider $urlRouterProvider Angular service
   * @param  {Object} $locationProvider  $locationProvider Angular service
   */
  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/404');

    // routes
    $stateProvider
      .state('app', {
        abstract: true,
        url: '',
        templateUrl: 'app/main/main.html',
        controller: 'MainController'
      })
      .state('app.home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'homeCtrl'
      })
      .state('app.404', {
        url: '/404',
        templateUrl: 'app/404.html'
      });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  /**
   * Run once the App is ready
   */
  function run() {
    console.log('App ready!');
  }
})();
