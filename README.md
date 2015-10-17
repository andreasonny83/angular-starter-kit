# Angular-Boilerplate

# Features
* SASS support including sourceMaps
* Minimal CSS styling of the view
* Gulp watch, build and local server tasks
* minified CSS and JS build files

## Download
```bash
git clone https://github.com/andreasonny83/angular-boilerplate.git
```

## 1. Setup
```bash
npm install
```
- install all npm and bower dependencies

## 2. Watch files
```bash
gulp
```
- all SCSS/HTML will be watched for changes and injected into browser thanks to BrowserSync

## 3. Build production version
```bash
gulp build
```
- this will process following tasks:
* clean `_build` folder
* compile SASS files, minify and uncss compiled css
* copy and optimize images
* minify and copy all HTML files into $templateCache
* build index.html
* minify and copy all JS files
* copy fonts

## 4. Start webserver without watch task
```bash
gulp server
```

## 5. Start webserver from build folder
```bash
gulp server-build
```

## 6. Deploy to remote using FTP
```bash
gulp deploy --user username --password password
replace ``username`` and ``password`` according to your remote ftp information
change the variable ``remoteHost`` inside the gulpfile.js according to your remote url
```


## Changelog
### 1.0.0
- initial release<br>
17.10.2015

## Todo

* add repository to package.json
