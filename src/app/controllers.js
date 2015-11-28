/**
 * Application controllers
 *
 */
;(function() {
  'use strict';

  var app = angular.module( 'app' );

  app.controller( 'MainController',   MainController );
  app.controller( 'HomeController',   HomeController );
  app.controller( 'SingleController', SingleController );

  function MainController( $scope, CONSTANTS, $http ) {
    $scope.data = {};
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
      $scope.data = data.items;
    })
    .error( function (data) {
      console.log(data);
    });
  }

  MainController.$inject = ['$scope', 'CONSTANTS', '$http'];

  function HomeController( $scope, $rootScope ) {
  }

  HomeController.$inject = ['$scope', '$rootScope'];

  function SingleController( $scope, $routeParams ) {
    // The youtube video id is fetched from the URL
    $scope.video_pos = $routeParams.videoID;

    // Autoplay video once ready
    $scope.$on( 'youtube.player.ready', function ( $event, player ) {
      player.playVideo();
    });
  }

  SingleController.$inject = ['$scope', '$routeParams'];

})();
