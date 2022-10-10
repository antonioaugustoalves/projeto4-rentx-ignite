import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCarsUseCase } from "./ListCarsUseCase";

class ListCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { category_id, brand, name } = request.query;
        const listCarsUseCase = container.resolve(ListCarsUseCase);
        const cars = await listCarsUseCase.execute({
            category_id: category_id as string,
            brand: brand as string,
            name: name as string,
        });
        return response.json(cars);
    }
}

export { ListCarsController };
