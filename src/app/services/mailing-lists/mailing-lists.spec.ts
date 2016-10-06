import { MailingListsService } from './mailing-lists.service';

describe('Service: MailingListsService', () => {

    beforeEach(function() {
        this.mailingListsService = new MailingListsService();
    });

    it('should return 3 mailing lists', function() {
        this.mailingListsService.getMailingLists()
            .then(mailingLists => validateMailingLists(mailingLists))
    });
});

function validateMailingLists(mailingLists) {
    expect(mailingLists.length).toBe(3);
}
