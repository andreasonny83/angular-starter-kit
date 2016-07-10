[![Build Status](https://travis-ci.org/andreasonny83/angular-starter-kit.svg?branch=master)](https://travis-ci.org/andreasonny83/angular-starter-kit)

# Angular Starter Kit

[![Join the chat at https://gitter.im/andreasonny83/angular-starter-kit](https://badges.gitter.im/andreasonny83/angular-starter-kit.svg)](https://gitter.im/andreasonny83/angular-starter-kit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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

## Download

```sh
git clone https://github.com/andreasonny83/angular-starter-kit.git
```

## Setup

Install all `npm` and `bower` dependencies with:

```sh
npm install
```

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
gulp server:build
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
[nodejs]: https://nodejs.org/
[gulp]: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
[bower]: https://bower.io/#install-bower
[changelog]: https://github.com/andreasonny83/angular-starter-kit/blob/master/CHANGELOG.md
