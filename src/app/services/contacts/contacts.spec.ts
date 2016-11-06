import { ContactsService } from './contacts.service';
import { CONTACTS } from '../../mock-data/mock-contacts';

describe('Service: ContactsService', () => {

    beforeEach(function() {
        this.contactsService = new ContactsService();
    });

    it('should return 4 contacts', function() {
        this.contactsService.getContacts()
            .then(contacts => expect(contacts.length).toBe(4));
    });
});
