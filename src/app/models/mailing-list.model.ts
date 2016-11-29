import { Contact } from './contact.model';

export class MailingList {
    id: number;
    name: string;
    description: string;
    members: Contact[];
    createdAt: string;
    updatedAt: string;

    constructor(id: number, name: string, description: string,
                members: Contact[], createdAt: string, updatedAt: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.members = members;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
