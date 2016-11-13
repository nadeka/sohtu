describe('campaign creation', function() {

    it('should be possible for user to add name and subject and then see them on the confirmation page', function() {
        browser.get('http://ext-dev-marketing-automation.s3-website-eu-west-1.amazonaws.com/#/marketing/create-campaign');

        var nameInputField;
        var subjectInputField;
        var nextButton;
        var workflowLink;

        const campaignName = 'DecemberClearance2016';
        const campaignSubject = 'Special Offers';

        element.all(by.css('input')).then(function(items) {
            nameInputField = items[0];
            subjectInputField = items[1];
            nameInputField.sendKeys(campaignName);
            subjectInputField.sendKeys(campaignSubject);
        });
        nextButton = element(by.cssContainingText('button', 'Next'));
        workflowLink = element.all(by.cssContainingText('a', 'Confirmation'));

        workflowLink.click();
        expect(browser.getCurrentUrl()).toBe('http://ext-dev-marketing-automation.s3-website-eu-west-1.amazonaws.com/#/marketing/create-campaign/confirmation');

        var campaignNameField = element(by.css('#campaign-name'));
        var campaignSubjectField = element(by.css('#campaign-subject'))
        expect(campaignNameField.getText()).toBe(campaignName);
        expect(campaignSubjectField.getText()).toBe(campaignSubject);
    });

});
