import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Specification } from "../infra/typeorm/entities/Specification";

interface ISpecificationsRepository {
    create({ name, description }: ICreateCategoryDTO): Promise<Specification>;
    list(): Promise<Specification[]>;
    findByName(name: string): Promise<Specification>;
    findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository };
