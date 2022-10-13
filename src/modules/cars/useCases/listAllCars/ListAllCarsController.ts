import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllCarsUseCase } from "./ListAllCarsUseCase";

class ListAllCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listAllCarsUseCase = container.resolve(ListAllCarsUseCase);
        const all = await listAllCarsUseCase.execute();
        return response.json(all);
    }
}

export { ListAllCarsController };
