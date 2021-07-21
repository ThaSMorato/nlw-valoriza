import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export const ensureAuthentication = (req: Request, res: Response, next: NextFunction) => {

    const authToken = req.headers.authorization;

    if(!authToken) {
        return res.status( 401 ).json({
            error: 'User not authenticated'
        });
    }
    
    const [ , token ] = authToken.split(" ");

    try {

        const { sub } = verify( token , "aefeb03210d082c70f22f127c5e7e7d7") as IPayload;
        
        req.user_id = sub;

        return next();

    } catch (err) {
        return res.status( 401 ).json({
            error: 'User not authenticated'
        });
    }
    
}