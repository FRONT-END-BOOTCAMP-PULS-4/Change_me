import { Category } from "../entities/Category";
import { CategoryView } from "../entities/CategoryView";
import { CategoryFilter } from "./filters/CategoryFilter";

export interface CategoryRepository {
    count(filter?: CategoryFilter): Promise<number>;
    findAll(filter?: CategoryFilter): Promise<Category[]>;
    findById(id: number): Promise<CategoryView | null>;
    save(category: Category): Promise<Category>;
    update(category: Category): Promise<void>;
    deleteById(id: number): Promise<void>;
}
