import { Contact } from '../models/contact.model';

export const CONTACTS: Contact[] = [
    new Contact(1, 'Jaska', 'Pulkkinen', 'jaska.pulkkinen@gmail.com', '050 223 5312',
        'Male', new Date().toDateString(), new Date().toDateString()),
    new Contact(2, 'Johanna', 'Mäkelä', 'johanna.mäkelä@gmail.com', '040 647 2134',
        'Female', new Date().toDateString(), new Date().toDateString()),
    new Contact(3, 'Hilja', 'Hirsjärvi', 'hhirsja@cs.helsinki.fi', '04007863321',
        'Female', new Date().toDateString(), new Date().toDateString()),
    new Contact(4, 'Uolevi', 'Ålund', 'uolevi.ålund@cs.helsinki.fi', '050123456',
        'Male', new Date().toDateString(), new Date().toDateString())
];

export const IMPORTED_CONTACTS = [
    {
        'First name': 'Johanna',
        'Last name': 'Mäkelä',
        'Email': 'johanna.mäkelä@gmail.com',
        'Telephone': '040 647 2134',
        'Gender': 'Female'
    }, {
        'First name': 'Uolevi',
        'Last name': 'Ålund',
        'Email': 'uolevi.ålund@cs.helsinki.fi',
        'Telephone': '050123456',
        'Gender': 'Male'
    }
];

export const RESPONSE_CONTACTS = [
    {
        id: 1,
        firstName: 'Johanna',
        lastName: 'Mäkelä',
        email: 'johanna.mäkelä@gmail.com',
        telephone: '040 647 2134',
        gender: 'Female',
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
    }, {
        id: 2,
        firstName: 'Uolevi',
        lastName: 'Ålund',
        email: 'uolevi.ålund@cs.helsinki.fi',
        telephone: '050123456',
        gender: 'Male',
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
    }
];
