import { Contact } from '../models/contact.model';

export const CONTACTS: Contact[] = [
    new Contact(1, 'Jaska', 'Pulkkinen', 'jaska.pulkkinen@gmail.com'),
    new Contact(2, 'Johanna', 'Mäkelä', 'johanna.mäkelä@gmail.com'),
    new Contact(3, 'Hilja', 'Hirsjärvi', 'hhirsja@cs.helsinki.fi'),
    new Contact(4, 'Uolevi', 'Ålund', 'uolevi.ålund@cs.helsinki.fi')
];

export const IMPORTED_CONTACTS = [
    {
        'First name': 'Etunimi',
        'Last name': 'Sukunimi',
        'Email': 'Sähköposti'
    }, {
        'First name': 'Etunimi2',
        'Last name': 'Sukunimi2',
        'Email': 'Sähköposti2'
    }
];
