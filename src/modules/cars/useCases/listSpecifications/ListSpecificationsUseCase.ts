import { inject, injectable } from "tsyringe";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private SpecificationsRepository: ISpecificationsRepository
    ) {}
    async execute(): Promise<Specification[]> {
        const specifications = await this.SpecificationsRepository.list();
        return specifications;
    }
}

export { ListSpecificationsUseCase };
