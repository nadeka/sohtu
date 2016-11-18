export class Template {
    id: number;
    name: string;
    html: string;
    htmlImage: string;
    createdAt: string;
    updatedAt: string;

    constructor(id: number, name: string, html: string,
                htmlImage: string, createdAt: string, updatedAt: string) {
        this.id = id;
        this.name = name;
        this.html = html;
        this.htmlImage = htmlImage;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
