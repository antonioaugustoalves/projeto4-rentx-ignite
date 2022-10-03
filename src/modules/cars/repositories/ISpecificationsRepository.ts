import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Specification } from "../infra/typeorm/entities/Specification";

interface ISpecificationsRepository {
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
    list(): Promise<Specification[]>;
    findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository };
