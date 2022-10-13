import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationsController } from "@modules/cars/useCases/createCarsSpecificationsList/CreateCarSpecificationsController";
import { ListAllCarsController } from "@modules/cars/useCases/listAllCars/ListAllCarsController";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const listAllCarsController = new ListAllCarsController();
const createCarSpecificationsController =
    new CreateCarSpecificationsController();
carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.post(
    "/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationsController.handle
);

carsRoutes.get("/avaliable", listCarsController.handle);
carsRoutes.get("/", listAllCarsController.handle);

export { carsRoutes };
