/**
 * MainController
 *
 */
(function() {
  'use strict';

  angular.module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['getData', 'YouTube'];

  function MainController(getData, YouTube) {
    var vm = this;

    activate();

    function activate() {
      // fetch the playlist items from the YouTube feed
      getData.getPlaylist(YouTube.API_URL, YouTube.API_KEY, YouTube.PLAYLIST_ID)
        .then(function(response) {
          vm.data = response.items || null;
        });
    }
  }
})();
