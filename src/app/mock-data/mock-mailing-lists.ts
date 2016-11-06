import { MailingList } from '../models/mailing-list.model';
import { CONTACTS } from '../mock-data/mock-contacts';

export const MAILING_LISTS: MailingList[] = [
    new MailingList(1, 'New customers', 'Description 1', CONTACTS),
    new MailingList(2, 'Women', 'Description 2', CONTACTS),
    new MailingList(3, 'Men', 'Description 3', CONTACTS)
];
