import { MailingList } from '../models/mailing-list.model';
import { CONTACTS } from '../test-data/test-contacts';

export const MAILING_LISTS: MailingList[] = [
    new MailingList(1, 'New customers', 'Description 1', CONTACTS,
        new Date().toDateString(), new Date().toDateString()),
    new MailingList(2, 'Women', 'Description 2', CONTACTS,
        new Date().toDateString(), new Date().toDateString()),
    new MailingList(3, 'Men', 'Description 3', CONTACTS,
        new Date().toDateString(), new Date().toDateString())
];
