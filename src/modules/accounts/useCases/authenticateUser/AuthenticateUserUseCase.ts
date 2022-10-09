import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}
interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}
@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {
        // Verifica se o e-mail está correto
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("E-mail or password incorrect");
        }

        const passwordMatch = compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("E-mail or password incorrect");
        }

        const token = sign({}, "3419f87e832a80b6d628da4e422e4865", {
            subject: user.id,
            expiresIn: "1d",
        });
        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email,
            },
        };
        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
