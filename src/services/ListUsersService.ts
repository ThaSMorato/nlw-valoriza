import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { UserRepositories } from "../repositories/UserRepositories";


class ListUsersService {

    async execute() {
        const usersRepositories = getCustomRepository(UserRepositories);

        const users = await usersRepositories.find();

        return classToPlain(users);
    }
}

export { ListUsersService };