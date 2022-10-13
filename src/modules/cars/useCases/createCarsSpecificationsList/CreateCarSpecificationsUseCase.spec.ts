import { CarSpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarSpecificationsRepositoryInMemory";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { specificationRoutes } from "@shared/infra/http/routes/specification.routes";

import { CreateCarSpecificationsUseCase } from "./CreateCarSpecificationsUseCase";

let createCarSpecifications: CreateCarSpecificationsUseCase;
let carsRepository: CarsRepositoryInMemory;
let specificationsRepository: CarSpecificationsRepositoryInMemory;
describe("Create car specification list", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        specificationsRepository = new CarSpecificationsRepositoryInMemory();
        createCarSpecifications = new CreateCarSpecificationsUseCase(
            carsRepository,
            specificationsRepository
        );
    });

    it("Should not be able to add a spefication to a non-exist car", () => {
        expect(async () => {
            const id = "123";
            const specifications_id = ["3334", "2355", "9099"];
            await createCarSpecifications.execute({
                car_id: id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to add a spefication to the car", async () => {
        const car = await carsRepository.create({
            name: "Fusca amarelo",
            description: "Fusca amarelo ano 77",
            daily_rate: 100,
            license_plate: "IVE-2322",
            fine_amount: 50,
            brand: "Volkswagen",
            category_id: "Teste",
        });
        const specification1 = await specificationsRepository.create({
            name: " Teto Solar",
            description: "Carro com teto solar",
        });

        const specification2 = await specificationsRepository.create({
            name: "Sensor de ré",
            description: "Carro com sensor de ré",
        });
        const specifications_id = [specification1.id, specification2.id];
        const specificationsCars = await createCarSpecifications.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(2);

        console.log(car);
    });
});
