export class Habitdto {
    id: string;
    title: string;
    description: string;
    categoryId: number;
    status: number;

    constructor(id: string, title: string, description: string, categoryId: number, status: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.categoryId = categoryId;
        this.status = status;
    }
}
