;(function() {
  'use strict';

  angular.module('app')
    .directive('pageHeader', pageHeader);

  function pageHeader() {

    // Definition of directive
    return {
      restrict: 'E',
      templateUrl: 'components/directives/page-header.html'
    }
  }

}());
