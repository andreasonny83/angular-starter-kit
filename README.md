# Angular Starter Kit

[![Join the chat at https://gitter.im/andreasonny83/angular-starter-kit][gitter-badge]](https://gitter.im/andreasonny83/angular-starter-kit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![NPM version][npm-badge]](https://www.npmjs.com/package/angular-starter-kit)
[![Build Status][travis-badge]](https://travis-ci.org/andreasonny83/angular-starter-kit)
[![devDependency Status][dependencies-badge]](https://david-dm.org/andreasonny83/angular-starter-kit#info=devDependencies)
[![npm][license-badge]](https://andreasonny.mit-license.org/@2016/)

> A better way to start your new Angular app

![Angular Logo][angular_logo]

## Features

*   SASS support including sourceMaps
*   Minimal CSS styling of the view
*   Gulp watch, build and local server tasks
*   Minified CSS and JS build files
*   Unit tests
*   E2E tests covered by Protractor
*   Istanbul code coverage

## Prerequisites

We assume you've already installed [NodeJS][nodejs], [Gulp][gulp] and
[Bower][bower] on your machine, if not,
please follow the installation documentation from the official websites.

## Installation

The easiest way to start your Angular project using Angular Starter Kit is
[Downloading the latest release][latest_release] of this project or simply
cloning this repository with:

```sh
git clone https://github.com/andreasonny83/angular-starter-kit.git
```

### Setup

Once done with the previous step, open your terminal to your angular-starter-kit
folder, then install all the dependencies with:

```sh
npm install
```

This will create both a `node_modules` and `bower_components` folder inside
your local directory

## Watch files

```sh
npm start
```

Trigger your browser to open pointing to your app project.
All SCSS/HTML/JS will be watched for changes and injected into browser thanks
to BrowserSync.

## Build a production version

```sh
npm run build
```

This will perform the following tasks:

*   clean the `.tmp` and `dist` folder
*   compile SASS files, minify and uncss the compiled css
*   copy and optimize images
*   minify and copy all HTML files into $templateCache
*   build index.html
*   minify and copy all JS files
*   copy fonts, if any

## Serve the distribution folder

```bash
npm run serve:dist
```

This will compile your project in distribution mode and will serve that in
your browser

## Unit tests

```bash
npm test
```

This will run all the unit tests present in your project folder using Karma.

The task will remain idle in your terminal waiting for file changes to
run the tests again. This task is really useful during the development mode
in order to avoid running manually your tests every time.

However, if you want just to run the test once and build a report displaying the
unit test coverage, use the following task:

```bash
npm run test-single-run
```

Either way, all the reports will be stored inside a generated `test_out` folder
and a `coverage` for the unit test coverage using [Istanbul][istanbul-url]

## E2E tests

```bash
npm run protractor
```

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -m 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

## Changelog

Changelog available [here][changelog]

[angular_logo]: https://angularjs.org/img/AngularJS-large.png
[gitter-badge]: https://badges.gitter.im/andreasonny83/angular-starter-kit.svg
[npm-badge]: https://badge.fury.io/js/generator-mdl.svg
[travis-badge]: https://travis-ci.org/andreasonny83/angular-starter-kit.svg?branch=master
[dependencies-badge]: https://david-dm.org/andreasonny83/angular-starter-kit/dev-status.svg
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[latest_release]: https://github.com/andreasonny83/angular-starter-kit/releases/latest
[nodejs]: https://nodejs.org/
[gulp]: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
[bower]: https://bower.io/#install-bower
[istanbul-url]: https://github.com/gotwarlost/istanbul
[changelog]: https://github.com/andreasonny83/angular-starter-kit/blob/master/CHANGELOG.md
