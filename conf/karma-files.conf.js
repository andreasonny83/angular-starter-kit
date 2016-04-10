'use strict';

function listFiles(fileList) {
  require('wiredep')({
    src: 'src/index.html'
  });

  fileList = fileList || [];

  var bowerDependencies = [
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-sanitize/angular-sanitize.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-material-toasts/dist/angular-material-toasts.min.js',
    'bower_components/angular-mocks/angular-mocks.js',
  ];

  return bowerDependencies.concat(fileList);
}

module.exports = listFiles;
