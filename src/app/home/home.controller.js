/**
 * HomeController
 *
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['CONSTANTS', '$http'];

    /* @ngInject */
    function HomeController(CONSTANTS, $http) {
        var vm = this;

        vm.data = {};

        activate();

        function activate() {
          // fetch the playlist items from the YouTube feed
          $http.get( CONSTANTS.API_URL, {
            params: {
              key: CONSTANTS.API_KEY,
              type: 'video',
              maxResults: '10',
              playlistId: CONSTANTS.PLAYLIST_ID,
              part: 'snippet,contentDetails,status'
            }
          })
          .success( function (data) {
            vm.data = data.items;
          })
          .error( function (data) {
            console.log(data);
          });
        }
    }
})();
