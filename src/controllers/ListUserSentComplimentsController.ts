import { Request, Response } from "express";
import { ListUserSentComplimentsService } from "../services/ListUserSentComplimentsService";

class ListUserSentComplimentsController {
    async handle( req: Request, res: Response) {
        const listUserSentComplimentsService = new ListUserSentComplimentsService();

        const { user_id } = req;

        const compliments = await listUserSentComplimentsService.execute(user_id)

        return res.json(compliments)
    }
}

export { ListUserSentComplimentsController }