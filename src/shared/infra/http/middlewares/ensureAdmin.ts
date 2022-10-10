import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(
    req: Request,
    resp: Response,
    next: NextFunction
) {
    const { id } = req.user;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    if (!user.isAdmin) {
        throw new AppError(
            "Access denied. You dont have administrative permissions"
        );
    }

    return next();
}
