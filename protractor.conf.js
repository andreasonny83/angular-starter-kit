exports.config = {

  allScriptsTimeout: 11000,

  specs: [
    'e2e-tests/**/*.js'
  ],

  capabilities: {
    browserName: 'chrome'
  },

  baseUrl: 'http://localhost:8000',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  onPrepare: function() {
    var width = 800;
    var height = 800;
    browser.driver.manage().window().setSize(width, height);
}

};
