/* eslint-disable import-helpers/order-imports */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import "express-async-errors";

import "../../container";

import { AppError } from "../../errors/AppError";

import createConnection from "../typeorm";
import { router } from "./routes";

createConnection();
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(express.json());

app.use(router);
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
            return response.status(500).json({
                status: "error",
                message: `Internal Server Error: ${err.message}`,
            });
        }
    }
);
export { app };

//This is just a coment from the same user from ubuntu