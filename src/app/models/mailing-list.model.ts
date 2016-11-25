import { Contact } from './contact.model';

export class MailingList {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    members: Contact[];

    constructor(id: number, name: string, description: string,
                members: Contact[], createdAt: string, updatedAt: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.members = members;
    }
}
