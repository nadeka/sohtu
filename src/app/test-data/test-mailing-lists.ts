import { MailingList } from '../models/mailing-list.model';
import { CONTACTS, RESPONSE_CONTACTS } from '../test-data/test-contacts';

export const MAILING_LISTS: MailingList[] = [
    new MailingList(1, 'New customers', 'Description 1', CONTACTS,
        new Date().toDateString(), new Date().toDateString()),
    new MailingList(2, 'Women', 'Description 2', CONTACTS,
        new Date().toDateString(), new Date().toDateString()),
    new MailingList(3, 'Men', 'Description 3', CONTACTS,
        new Date().toDateString(), new Date().toDateString())
];

export const RESPONSE_MAILING_LISTS = [
    {
        id: 1,
        name: 'test list',
        description: 'test description',
        members: RESPONSE_CONTACTS,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
    },
    {
        id: 2,
        name: 'test list2',
        description: 'test description2',
        members: RESPONSE_CONTACTS,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
    },
    {
        id: 3,
        name: 'test list3',
        description: 'test description3',
        members: RESPONSE_CONTACTS,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
    }
];
