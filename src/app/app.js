/**
 * Angular boilerplate
 *
 * @author    Andrea Zornada <andreasonny83@gmail.com>
 * @license   MIT
 *
 */
;(function() {

  angular
    .module( 'app', [
      'ngRoute',
      'ngAnimate'
    ])
    .config( config );

  // safe dependency injection
  // this prevents minification issues
  config.$inject = ['$routeProvider'];

  /**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   *
   */
  function config( $routeProvider ) {

    // routes
    $routeProvider
      .when( '/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        controllerAs: 'homeCtrl'
      })
      .when( '/video/:videoID', {
        templateUrl: 'views/single.html',
        controller: 'SingleController',
        controllerAs: 'singleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
