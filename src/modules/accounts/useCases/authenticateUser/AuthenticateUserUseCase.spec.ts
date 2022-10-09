import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let autheticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
describe("User's authentication test", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        autheticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
    });
    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: "Antonio Alves",
            email: "antonio@rentx.com.br",
            password: "1234",
            driver_license: "1234123411",
        };

        await createUserUseCase.execute(user);

        const result = await autheticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        expect(result).toHaveProperty("token");
        // console.log(result);
    });

    it("Should not be able to authenticate a non-existent user", () => {
        expect(async () => {
            await autheticateUserUseCase.execute({
                email: "false@rentx.com.br",
                password: "4321",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    it("Should not be able to authenticate an user with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "Antonio Alves",
                email: "antonio@rentx.com.br",
                password: "1234",
                driver_license: "1234123411",
            };
            await createUserUseCase.execute(user);
            await autheticateUserUseCase.execute({
                email: user.email,
                password: "asdf.12345",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
