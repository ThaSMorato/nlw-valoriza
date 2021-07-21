import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthentiocateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute ({ email, password } : IAuthentiocateRequest) {

        const userRepositories = getCustomRepository(UserRepositories);

        const user = await userRepositories.findOne({ email });

        if(!user) {
            throw new Error("Email/Password does not exist");
        }

        const passwordMatch = await compare(password, user.password);

        if(! passwordMatch ) {
            throw new Error("Email/Password does not exist");
        }

        //44108e1c851d68693c5a5128920e3c8d72d57abb
        //wumpaloumpadipiridum
        const token = sign({
                email: user.email,
            },
            "aefeb03210d082c70f22f127c5e7e7d7",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        )

        return token;
    }
}

export { AuthenticateUserService }