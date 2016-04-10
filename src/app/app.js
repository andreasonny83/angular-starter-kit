/**
 * Angular boilerplate
 *
 * @author    Andrea Zornada <andreasonny83@gmail.com>
 * @license   MIT
 *
 */
(function() {
  'use strict';

  angular.module('app', [
      'ngRoute',
      'ngSanitize',
      'ngAnimate',
      'getData',
      'ngMaterialToasts'
    ])
    .config(config)
    .run(run);

  // safe dependency injection
  // this prevents minification issues
  config.$inject = ['$routeProvider', '$locationProvider'];
  run.$inject = ['$timeout', 'materialToast'];

  /**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   *
   */
  function config($routeProvider, $locationProvider) {

    // routes
    $routeProvider
      .when('/', {
        templateUrl: 'app/home/home.html'
      })
      .when('/video/:videoID', {
        templateUrl: 'app/single/single.html',
        controller: 'SingleController',
        controllerAs: 'singleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  function run($timeout, materialToast) {
    console.log('App ready.');

    $timeout(function() {
      materialToast.show('Welcome to AngularBoilerplate.', {timeOut: 6000});
    }, 1000);
  }
})();
