import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepository: CarsRepositoryInMemory;
describe("List avaliable cars", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepository);
    });
    it("Should be able to list all avaliable cars", async () => {
        const car = await carsRepository.create({
            name: "Chevrolet Cruze LTZ",
            description: "Sedan Completo",
            daily_rate: 800.0,
            license_plate: "ISD9R36",
            fine_amount: 200.0,
            brand: "Chevrolet",
            category_id: "baf5ec39-8d66-4c58-94bf-09b141644e78",
        });
        const cars = await listCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all avaliable cars by brand", async () => {
        const car = await carsRepository.create({
            name: "Chevrolet Cruze LTZ",
            description: "Sedan Completo",
            daily_rate: 800.0,
            license_plate: "ISD9R36",
            fine_amount: 200.0,
            brand: "Chevrolet",
            category_id: "baf5ec39-8d66-4c58-94bf-09b141644e78",
        });
        const cars = await listCarsUseCase.execute({ brand: "Chevrolet" });
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all avaliable cars by category", async () => {
        const car = await carsRepository.create({
            name: "Chevrolet Cruze LTZ",
            description: "Sedan Completo",
            daily_rate: 800.0,
            license_plate: "ISD9R36",
            fine_amount: 200.0,
            brand: "Chevrolet",
            category_id: "baf5ec39-8d66-4c58-94bf-09b141644e78",
        });
        const cars = await listCarsUseCase.execute({
            category_id: "baf5ec39-8d66-4c58-94bf-09b141644e78",
        });
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all avaliable cars by name", async () => {
        const car = await carsRepository.create({
            name: "Chevrolet Cruze LTZ",
            description: "Sedan Completo",
            daily_rate: 800.0,
            license_plate: "ISD9R36",
            fine_amount: 200.0,
            brand: "Chevrolet",
            category_id: "baf5ec39-8d66-4c58-94bf-09b141644e78",
        });
        const cars = await listCarsUseCase.execute({
            name: "Chevrolet Cruze LTZ",
        });
        expect(cars).toEqual([car]);
    });
});
