export class Template {
    id: number;
    name: string;
    content: string;
    thumbnailImage: string;

    constructor(id: number, name: string, content: string, thumbnailImage: string) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.thumbnailImage = thumbnailImage;
    }
}
