;(function() {
  'use strict';

  angular.module('app')
    .directive('pageFooter', pageFooter);

  function pageFooter() {

    return {
      restrict: 'E',
      templateUrl: 'app/page-footer/page-footer.html'
    }

  }

}());
