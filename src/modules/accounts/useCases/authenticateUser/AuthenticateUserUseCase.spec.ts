import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
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

        usersRepositoryInMemory.create(user);
    });
});
