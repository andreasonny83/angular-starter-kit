;(function() {
  'use strict';

  var app = angular.module('boilerplate', []);

  app.directive( 'homeView', function() {
      return {
        restrict: 'E',
        templateUrl: 'views/home.html'
      };
    });

})();
