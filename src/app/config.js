;(function() {
	/**
	 * Defining some application constants
	 */
  angular
  	.module( 'app' )
    .constant( 'CONSTANTS', {
      'API_URL':     'https://www.googleapis.com/youtube/v3/playlistItems',
      'API_KEY':     'AIzaSyCzsXq1EsICTS8ARhoEk8_kHhClZhifzVE',
      'PLAYLIST_ID': 'PLTzjKIHThOWbTufE3xmrT_1nShyeHp5Re'
    });
    // https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&playlistId=PLTzjKIHThOWbTufE3xmrT_1nShyeHp5Re&key=AIzaSyCzsXq1EsICTS8ARhoEk8_kHhClZhifzVE

})();
