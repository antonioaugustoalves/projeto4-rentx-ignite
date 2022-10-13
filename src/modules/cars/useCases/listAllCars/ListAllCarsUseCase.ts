import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepositoy";

@injectable()
class ListAllCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carRepository: ICarsRepository
    ) {}
    async execute(): Promise<Car[]> {
        const all = await this.carRepository.list();
        return all;
    }
}

export { ListAllCarsUseCase };
