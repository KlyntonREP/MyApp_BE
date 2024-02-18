import { Request } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "./apiError";

// verifying authorization token and storing it in the req.user
export const ValidateJwt = async (req: Request) => {
  const signature = req.header("Authorization");

  if (signature) {
    const payload = jwt.verify(
      signature.split(" ")[1],
      process.env.JWT_SECRET!
    );
    req.loggedInUser = payload;

    return true;
  }
  return false;
};

//generating a random token for jwt
const genToken = async(data: any) => {
   const token = jwt.sign(
        { ...data,}, process.env.JWT_SECRET as string, {expiresIn: process.env.JWT_EXPIRE}
    );
    return token
}

// creating a jwt token with the "genToken" function
export const signToken = async (data: any) => {
    const token = await genToken({
      ...data,
    });
  
    return token;
};

//verify jwt token
export const verifyAuthTokens = async (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, userName: string};

    return payload;
  } catch (error) {
    console.log("verify token error: ", error);
    return {
      error: new ApiError('Error verifying auth tokens', error as Error),
    };
  }
};