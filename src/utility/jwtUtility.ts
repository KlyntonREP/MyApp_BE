import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { IDataStoredInToken } from '../dto/index';

// verifying authorization token and storing it in the req.user
export const ValidateJwt = async (req: Request) => {
    try {
        const signature = req.header('Authorization');

        if (signature) return verifyAccessToken(signature.split(' ')[1]);

        return null;
    } catch (err) {
        // log.error(error);
        return null;
    }
};

// creating a jwt token

const signToken = (
    data: IDataStoredInToken,
    { expiry, type }: { expiry: string; type: 'accessToken' | 'refreshToken' | 'passwordResetToken' | 'verifyEmailToken' },
): string => {
    return jwt.sign(
        { ...data },
        type === 'accessToken'
            ? process.env.JWT_SECRET!
            : type === 'refreshToken'
              ? process.env.JWT_REFRESH_SECRET!
              : type === 'passwordResetToken'
                ? process.env.PASSWORD_RESET_SECRET!
                : type === 'verifyEmailToken'
                  ? process.env.VERIFY_EMAIL_SECRET!
                  : '',
        {
            expiresIn: expiry,
        },
    );
};

export const createAccessToken = (userId: string, userEmail: string): string => {
    return signToken({ userId, userEmail } as IDataStoredInToken, { expiry: process.env.JWT_EXPIRE as string, type: 'accessToken' });
};

export const createRefreshToken = (userId: string, userEmail: string): string => {
    return signToken({ userId, userEmail } as IDataStoredInToken, { expiry: process.env.REFRESH_EXPIRE as string, type: 'refreshToken' });
};

// verify jwt refresh token
export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!) as IDataStoredInToken;
};
// verify jwt refresh token
export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as IDataStoredInToken;
};
// verify jwt refresh token
export const verifyPasswordResetToken = (token: string) => {
    return jwt.verify(token, process.env.PASSWORD_RESET_SECRET!) as IDataStoredInToken;
};
// verify jwt refresh token
export const verifyEmailToken = (token: string) => {
    return jwt.verify(token, process.env.VERIFY_EMAIL_SECRET!) as IDataStoredInToken;
};
