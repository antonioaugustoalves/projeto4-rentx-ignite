import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepositoy";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;
    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        await this.repository.save(car);
        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });
        return car;
    }

    async findAvaliable(
        category_id?: string,
        brand?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("c")
            .where("avaliable  = :avaliable", { avalible: true });
        if (brand) {
            carsQuery.andWhere("c.brand = :brand", { brand });
        }
        if (category_id) {
            carsQuery.andWhere("c.category_id = :category_id", { category_id });
        }

        if (name) {
            carsQuery.andWhere("c.name = :name", { name });
        }
        const cars = await carsQuery.getMany();
        return cars;
    }
}

export { CarsRepository };
