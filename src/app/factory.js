;(function() {


  /**
   * Sample factory
   *
   * You can fetch here some data from API and the use them
   * in controller
   *
   */
  angular
    .module('app')
    .factory('getDataFromAPI', getDataFromAPI);

  getDataFromAPI.$inject = ['$http'];


  ////////////


  function getDataFromAPI($http) {

    return {
      loadData: loadData
    };


    ////////////  function definitions


    /**
     * Load articles from GetPocket API
     * @return {Object} Articles object
     */
    // var request = {
    //   consumer_key: 'xxxx',
    //   access_token: 'xxxx',
    //   sort: 'newest',
    //   count: 5
    // };

    // return $http({
    //   method: 'GET',
    //   url: API.url + 'v3/get',
    //   params: request
    // }).then(function(articles) {
    //   return articles.data;
    // })
    // .catch(function(error) {
    //   return error;
    // });
  }


})();
