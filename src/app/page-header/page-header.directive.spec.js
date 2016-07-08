/**
* angular-starter-kit
*
* @author Andrea SonnY <andreasonny83@gmail.com>
* @copyright 2016 Andrea SonnY <andreasonny83@gmail.com>
*
* This code may only be used under the MIT style license.
*
* @license MIT  https://andreasonny.mit-license.org/@2016/
*/
'use strict';

describe('Directive: backButton', function() {
  var $compile;
  var $rootScope;
  var element;

  beforeEach(module('app', 'my.templates'));

  beforeEach(inject(function(_$compile_, _$rootScope_, $templateCache) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    var template = $templateCache.get('app/page-header/page-header.html');
    $templateCache.put('app/page-header/page-header.html', template);
  }));

  it('Replaces the element with the appropriate content', function() {
    element = $compile('<page-header></page-header>')($rootScope);
    $rootScope.$digest();
    expect(1).toBe(1);
    expect(element.html()).toContain('Angular Starter Kit');
  });
});
