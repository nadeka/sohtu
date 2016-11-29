export class Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    gender: string;
    createdAt: string;
    updatedAt: string;

    constructor(id: number, firstName: string, lastName: string,
                email: string, telephone: string, gender: string,
                createdAt: string, updatedAt: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.telephone = telephone;
        this.gender = gender;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
