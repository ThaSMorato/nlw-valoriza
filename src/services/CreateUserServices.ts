import { IUser } from "../entities/User";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {

    async execute ({ email, name, admin = false, password } : IUserRequest): Promise<IUser> {

        if (!email) {
            throw new Error("Email is empty");
        }

        const userRepositories = getCustomRepository(UserRepositories);

        const userAlreadyExists = await userRepositories.findOne({ email });

        if( userAlreadyExists ) {
            throw new Error('User already exists');
        }

        const passwordHash = await hash(password, 8);

        const user = userRepositories.create({
            name,
            email,
            admin,
            password : passwordHash
        });

        await userRepositories.save(user);

        return user;
    }
}

export { CreateUserService }