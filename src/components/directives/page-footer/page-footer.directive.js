;(function() {
  'use strict';

  angular.module('app')
    .directive('pageFooter', pageFooter);

  function pageFooter() {

    return {
      restrict: 'E',
      templateUrl: 'components/directives/page-footer/page-footer.html'
    }

  }

}());
