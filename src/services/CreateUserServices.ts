import { IUser } from "../entities/User";
import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {

    async execute ({ email, name, admin } : IUserRequest): Promise<IUser> {

        if (!email) {
            throw new Error("Email is empty");
        }

        const userRepositories = getCustomRepository(UserRepositories);

        const userAlreadyExists = await userRepositories.findOne({ email });

        if( userAlreadyExists ) {
            throw new Error('User already exists');
        }

        const user = userRepositories.create({
            name,
            email,
            admin
        });

        await userRepositories.save(user);

        return user;
    }
}

export { CreateUserService }