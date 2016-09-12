describe('homepage', function() {
  it('when the homepage is rendered', function() {
    browser.get('http://localhost:8000');
  });

  describe('element: header', function() {
    it('the page should contains a header element', function() {
      var header = element.all(by.css('md-toolbar'));

      expect((header).count()).toEqual(1);
      expect(header.get(0).element(by.css('.md-toolbar-tools')).getText())
          .toEqual('Angular Starter Kit');
    });
  });

  describe('element: tabs', function() {
    it('the page should contains a tabs element', function() {
      /**
       * Protractor supports for pausing to debug
       * Read more at:
       *
       * https://github.com/angular/protractor/blob/master/docs/debugging.md#pausing-to-debug
       */
      // browser.pause();
      expect($('.md-tabs').isDisplayed()).toBe(true);
    });

    it('and should contains 3 tab elements', function() {
      expect(element.all(by.css('md-tab-data md-tab')).count())
          .toBe(3);

      expect(element.all(by.css('md-tab-data md-tab'))
            .get(0)
            .getAttribute('label'))
          .toEqual('Step 1');

      expect(element.all(by.css('md-tab-data md-tab'))
            .get(1)
            .getAttribute('label'))
          .toEqual('Step 2');

      expect(element.all(by.css('md-tab-data md-tab'))
            .get(2)
            .getAttribute('label'))
          .toEqual('Step 3');
    });
  });

  describe('element: Step 1', function() {
    it('clicking on Next, should display an error message', function() {
      var toast = element(by.css('md-toast'));
      var toastMsg = 'You must fill all the required information first.';

      $('.step1__next').click();

      browser.wait(function() {
        return browser.isElementPresent(toast);
      });

      expect(toast.getText()).toBe(toastMsg);
    });

    it('clicking on Next, should go to the Step 2', function() {
      element(by.model('homeCtrl.user.name')).sendKeys('foo');
      element(by.model('homeCtrl.user.title')).sendKeys('mr');

      // The user is still on the first tab
      element(by.css('md-tabs')).evaluate('homeCtrl.selectedIndex')
      .then(function(selectedIndex) {
        expect(selectedIndex).toBe(0);
      });

      $('.step1__next').click();

      // Now we are on the Step 2
      element(by.css('md-tabs')).evaluate('homeCtrl.selectedIndex')
        .then(function(selectedIndex) {
          expect(selectedIndex).toBe(1);
        });
    });
  });
});
