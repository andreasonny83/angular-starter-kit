(function() {
  'use strict';
  /**
   * Defining some application constants
   *
   *https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&playlistId=PLPPCWQUl7P2lUwCGFRItvDOHVE_zxO0jJ&key=AIzaSyCzsXq1EsICTS8ARhoEk8_kHhClZhifzVE
   */
  angular
    .module('app')
    .constant('YouTube', {
      API_URL:     'https://www.googleapis.com/youtube/v3/playlistItems',
      API_KEY:     'AIzaSyCzsXq1EsICTS8ARhoEk8_kHhClZhifzVE',
      PLAYLIST_ID: 'PLPPCWQUl7P2lUwCGFRItvDOHVE_zxO0jJ'
    });
})();
