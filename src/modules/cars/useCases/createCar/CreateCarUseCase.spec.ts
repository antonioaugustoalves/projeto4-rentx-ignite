import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;
describe("Create Car", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    });
    it("Should be able to create a car", async () => {
        const car = await createCarUseCase.execute({
            name: "Uno Mille",
            description: "Uno Mille ano 96",
            daily_rate: 100,
            license_plate: "IKK4544",
            fine_amount: 30,
            brand: "Fiat",
            category_id: "80f760ed-733c-4b31-97bf-917108810dba",
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a car with same license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Uno Mille",
                description: "Uno Mille ano 96",
                daily_rate: 100,
                license_plate: "IKK4544",
                fine_amount: 30,
                brand: "Fiat",
                category_id: "80f760ed-733c-4b31-97bf-917108810dba",
            });

            await createCarUseCase.execute({
                name: "Palio ELX",
                description: "Palio ELX ano 1999",
                daily_rate: 100,
                license_plate: "IKK4544",
                fine_amount: 30,
                brand: "Fiat",
                category_id: "80f760ed-733c-4b31-97bf-917108810dba",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("The Car should be created with avaliability", async () => {
        const car = await createCarUseCase.execute({
            name: "Palio ELX avaliable",
            description: "Palio ELX ano 1999",
            daily_rate: 100,
            license_plate: "IAX3422",
            fine_amount: 30,
            brand: "Fiat",
            category_id: "80f760ed-733c-4b31-97bf-917108810dba",
        });
        expect(car.avaliable).toBe(true);
    });
});
