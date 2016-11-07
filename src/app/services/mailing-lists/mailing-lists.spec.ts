import { MailingListsService } from './mailing-lists.service';
import { Contact } from '../../models/contact.model';
import { MailingList } from '../../models/mailing-list.model';

describe('Service: MailingListsService', () => {

    beforeEach(function() {
        this.mailingListsService = new MailingListsService();
    });

    it('should return 3 mailing lists', function() {
        this.mailingListsService.getMailingLists()
            .then(mailingLists => validateMailingLists(mailingLists));
    });

    it('create mailing list function should work', function() {
        let c: Contact = new Contact(1, 'firstname', 'lastname', 'test@test.com');
        let test: MailingList;
        this.test = this.mailingListsService.createMailingList(
                    'test list', 'testing creating list', [this.c]);
        expect(this.test.members.length).toBe(1);
    });
});

function validateMailingLists(mailingLists) {
    expect(mailingLists.length).toBe(3);
}
