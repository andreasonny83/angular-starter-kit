(function() {
  'use strict';

  angular
    .module('app')
    .controller('SingleController', SingleController);

  SingleController.$inject = ['$routeParams', '$sce'];

  /* @ngInject */
  function SingleController($routeParams, $sce) {
    var vm = this;

    // The youtube video id is fetched from the URL
    vm.videoPos = $routeParams.videoID;

    vm.videoSrc = function(src) {
      return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + src + '?autoplay=1');
    };

    vm.getData = function(data) {
      return (data && data.snippet && data.snippet.description) ? data.snippet.description : '';
    };
  }
})();
