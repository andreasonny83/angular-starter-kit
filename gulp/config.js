const path = require('path');

const src = path.join(__dirname, '../src');
const dist = path.join(__dirname, '../dist');
const temp = path.join(__dirname, '../.tmp');

const AUTOPREFIXER = [
  'last 2 versions',
  'safari >= 7',
  'ie >= 9',
  'ff >= 30',
  'ios 6',
  'android 4'
];

const config = {
  src: src,
  tmp: temp,
  dist: dist,
  images: 'images',
  scripts: 'scripts',
  styles: 'styles',
  autoprefixer: AUTOPREFIXER
};

module.exports = config;
