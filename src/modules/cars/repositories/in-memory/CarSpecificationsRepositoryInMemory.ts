import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { ISpecificationsRepository } from "../ISpecificationsRepository";

class CarSpecificationsRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];
    async create({
        name,
        description,
    }: ICreateCategoryDTO): Promise<Specification> {
        const specification = new Specification();
        Object.assign(specification, { name, description });
        this.specifications.push(specification);
        return specification;
    }
    async list(): Promise<Specification[]> {
        return this.specifications;
    }
    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(
            (specification) => specification.name === name
        );
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const list = await this.specifications.filter((specification) =>
            ids.includes(specification.id)
        );
        return list;
    }
}

export { CarSpecificationsRepositoryInMemory };
