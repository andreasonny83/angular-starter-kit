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

## Changelog

### 1.2.0

*   Replacing Material Design Lite with Angular Material
*   Better Gulp
*   Removing JSHint in favour of ESLint
*   Karma improved for Unit testing
*   General restyling and better Web Application support

2016.07.08

### 1.0.1

*   Twitter Bootstrap and JQuery removed and implemented Bourbon with Neat
*   support for web app
*   file structure improved according to the JohnPapa styleguide
*   icons
*   robots.txt
*   manifest.webapp for web app support
*   gulp file updated
*   Support for Google Analytics in index.html

2015.12.28

### 1.0.0

*   initial release

2015.10.17

[angular_logo]: https://angularjs.org/img/AngularJS-large.png
