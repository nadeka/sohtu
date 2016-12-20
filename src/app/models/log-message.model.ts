export class LogMessage {
    id: number;
    msg: string;
    level: string;
    meta: any;
    createdAt: string;
    updatedAt: string;

    constructor(id: number, msg: string, level: string,
                meta: any, createdAt: string, updatedAt: string) {
        this.id = id;
        this.msg = msg;
        this.level = level;
        this.meta = meta;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
