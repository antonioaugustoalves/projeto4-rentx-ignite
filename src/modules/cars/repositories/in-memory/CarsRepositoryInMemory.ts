import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepositoy";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        await this.cars.push(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.cars.find(
            (car) => car.license_plate === license_plate
        );
        return car;
    }

    async findAvaliable(
        category_id?: string,
        brand?: string,
        name?: string
    ): Promise<Car[]> {
        const all = this.cars.filter((car) => {
            if (
                car.avaliable === true ||
                (brand && car.brand === brand) ||
                (name && car.name === name) ||
                (category_id && car.category_id === category_id)
            ) {
                return car;
            }
            return null;
        });
        return all;
    }
}

export { CarsRepositoryInMemory };
