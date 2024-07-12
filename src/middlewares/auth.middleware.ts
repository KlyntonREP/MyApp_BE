import { NextFunction, Request, Response } from 'express';
import { ValidateJwt } from '../utility/jwtUtility';
import { UserDoc } from '../models/user.model';
import { UserModel } from '../models';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            file?: Express.Multer.File;
            // files?: Express.Multer.File[];
            loggedInUser?: UserDoc;
            deviceId: string;
        }
    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = await ValidateJwt(req);

        if (payload) {
            const user = await UserModel.findById(payload.userId);
            if (!user)
                return res.status(401).json({
                    message: 'User Not Authorized',
                });

            req.loggedInUser = user;
            next();
        } else {
            return res.status(400).json({
                message: 'User Not Authorized',
            });
        }
    } catch (err) {
        res.status(500).json({ message: 'Your token has expired please request for a refresh token' });
    }
};
