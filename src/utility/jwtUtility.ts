import { Request } from "express";
import jwt from "jsonwebtoken";

const genToken = async(data: any) => {
    let token
    token = jwt.sign(
        { ...data,}, process.env.JWT_SECRET as string, {expiresIn: process.env.JWT_EXPIRE}
    );
    return token
}

export const signToken = async (data: any) => {
    const token = await genToken({
      ...data,
    });
  
    return token;
  };