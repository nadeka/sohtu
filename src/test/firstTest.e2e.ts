describe('New campaign creation page', function() {

    it('should be possible for user to add campaign name and subject', function() {
        browser.get('http://ext-dev-marketing-automation.s3-website-eu-west-1.amazonaws.com/#/marketing/create-campaign');

        expect(browser.getTitle()).toEqual('Sohtu');
	});

});