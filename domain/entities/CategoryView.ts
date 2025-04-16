import { Category } from "./Category";

export class CategoryView extends Category {
    constructor(public habitCount: number = 0) {
        super();
    }
}
