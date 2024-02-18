import { object, string, TypeOf } from 'zod';

export const UserRegisterInputSchema = object({
    body: object({
      firstName: string({
        required_error: 'First Name is required',
      }),
      lastName: string({
        required_error: 'Last Name is required',
      }),
      userName: string({
        required_error: 'Username is required',
      }),
      email: string({
        required_error: 'Email is required',
      }).email('Not a valid email address'),
      phone: string({
        required_error: 'Phone is required',
      }),
      password: string({
        required_error: 'Password is required',
      }).min(6, 'Password too short - should be 6 chars minimum'),
      confirmPassword: string({
        required_error: 'Confirm Password is required',
      }).min(6, 'Confirm Password too short - should be 6 chars minimum'),
    }),
  });

export interface IEmailVerify{
  otp: string;
  email: string;
}

export interface IUserLogin{
  email?: string;
  username?: string;
  password: string;
}

export interface IUserResendcode{
  email: string;
}

export interface IUserForgotPassEmail{
  email: string;
}

export interface IUserResetPass{
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

export interface IUserForgotPassPhone {
  phoneNumber: string;
}

export interface IEditProfile{
  fullName?: string;
  userName?: string;
  gender?: string;
  bio?: string;
  email?: string;
  phoneNumber?: string;
}

export interface IEditEmail{
  email: string;
}

export interface IChangeEmail{
  otp: string;
  email: string;
}

export interface ICreatePost{
  caption: string;
}

export type IUserRegisterInput = TypeOf<typeof UserRegisterInputSchema>