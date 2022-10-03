import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../infra/typeorm/entities/Category";

interface ICategoriesRepository {
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
}

export { ICategoriesRepository };
