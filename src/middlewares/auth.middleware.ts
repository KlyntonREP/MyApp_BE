import { NextFunction, Request, Response } from "express";
import { ValidateJwt } from "../utility/jwtUtility";

declare global {
  namespace Express {
    interface Request{
      user?: any;
    }
  }
}

export const Authenticate = async ( req: Request, res: Response, next: NextFunction ) => {
  const validate = await ValidateJwt(req);

  if (validate) {
    next();
  } else {
    return res.status(400).json({
      message: "User Not Authorized",
    });
  }
};

