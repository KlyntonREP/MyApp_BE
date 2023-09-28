import { NextFunction, Request, Response } from "express";
import { IAuthPayload } from "../dto/index";
import { ValidateJwt } from "../utility/jwtUtility";
import asyncHandler from "express-async-handler";

declare global {
  namespace Express {
    interface Request {
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
      message: "User not Authenticated",
    });
  }
};

