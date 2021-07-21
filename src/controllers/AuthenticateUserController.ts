import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateuserService";

class AuthenticateUserController {

    async handle(req : Request , res : Response) {

        const {email, password} = req.body;

        const authenticateUserService = new AuthenticateUserService();

        const token = await authenticateUserService.execute({email, password});

        return res.json({ token });
    }
}

export { AuthenticateUserController }