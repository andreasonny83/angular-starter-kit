[![Build Status](https://travis-ci.org/andreasonny83/angular-starter-kit.svg?branch=master)](https://travis-ci.org/andreasonny83/angular-starter-kit)

# Angular Starter Kit

> A better way to start your new Angular app

![Angular Logo][angular_logo]

## Features

*   SASS support including sourceMaps
*   Minimal CSS styling of the view
*   Gulp watch, build and local server tasks
*   Minified CSS and JS build files

## Download

```sh
git clone https://github.com/andreasonny83/angular-starter-kit.git
```

## Setup

Install all `npm` and `bower` dependencies with:

```sh
npm install && bower install
```

## Watch files

All SCSS/HTML will be watched for changes and injected into browser thanks
to BrowserSync

```sh
gulp
```

## Build production version

```sh
gulp build
```

This will perform the following tasks:

*   clean `dist` folder
*   compile SASS files, minify and uncss compiled css
*   copy and optimize images
*   minify and copy all HTML files into $templateCache
*   build index.html
*   minify and copy all JS files
*   copy fonts

## Start webserver without watch task

```bash
gulp server
```

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
[changelog]: https://github.com/andreasonny83/angular-starter-kit/blob/master/CHANGELOG.md
