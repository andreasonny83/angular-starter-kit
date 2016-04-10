(function() {
  'use strict';

  angular
    .module('getData', [])
    .factory('getData', getData);

  getData.$inject = ['$q', '$http'];

  function getData($q, $http) {
    var service = {
      getPlaylist: getPlaylist
    };

    return service;

    function getPlaylist(url, apiKey, id) {
      var defer = $q.defer();

      $http({
        method: 'GET',
        url: url,
        params: {
          key: apiKey,
          type: 'video',
          maxResults: '10',
          playlistId: id,
          part: 'snippet,contentDetails,status'
        }
      }).then(function successCallback(response) {
          defer.resolve(response.data);
        }, function errorCallback() {
          defer.resolve({});
        });

      return defer.promise;
    }
  }
})();
