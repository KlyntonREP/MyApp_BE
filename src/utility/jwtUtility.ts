import { Request } from "express";
import jwt from "jsonwebtoken";

export const ValidateJwt = async (req: Request) => {
  const signature = req.get("Authorization");

  if (signature) {
    const payload = jwt.verify(
      signature.split(" ")[1],
      process.env.JWT_SECRET!
    );
    req.user = payload;

    return true;
  }

  return false;
};

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