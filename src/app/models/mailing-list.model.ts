import { Contact } from './contact.model';

export class MailingList {
    id: number;
    name: string;
    description: string;
    members: Contact[];

    constructor(id: number, name: string, description: string, members: Contact[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.members = members;
    }
}
