import { Category } from "../entities/Category";
import { CategoryFilter } from "./filters/CategoryFilter";

export interface CategoryRepository {
    count(filter?: CategoryFilter): Promise<number>;
    findAll(filter?: CategoryFilter): Promise<Category[]>;
    findById(id: number): Promise<Category | null>;
    findByName(name: string): Promise<Category | null>;
    save(category: Category): Promise<Category>;
    update(category: Category): Promise<Category>;
    deleteById(id: number): Promise<void>;
}
