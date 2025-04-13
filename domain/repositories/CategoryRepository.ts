import { Category } from "../entities/Category";

export interface CategoryRepository {
    findAll(): Promise<Category[]>;
    findById(id: number): Promise<Category | null>;
    save(category: Category): Promise<Category>;
    update(category: Category): Promise<Category>;
    deleteById(id: number): Promise<void>;
}
