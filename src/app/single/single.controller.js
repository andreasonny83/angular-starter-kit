(function() {
    'use strict';

    angular
        .module('app')
        .controller('SingleController', SingleController);

    SingleController.$inject = ['$routeParams'];

    /* @ngInject */
    function SingleController($routeParams) {
        var vm = this;

        // The youtube video id is fetched from the URL
        vm.video_pos = $routeParams.videoID;

        activate();

        function activate() {
          // Autoplay video once ready
          $scope.$on( 'youtube.player.ready', function ( $event, player ) {
            player.playVideo();
          });
        }
    }
})();
