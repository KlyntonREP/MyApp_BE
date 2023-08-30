import { number, object, string, TypeOf } from 'zod';

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
  
export interface IUserVerify{
  verification_code: number;
}

export interface IUserLogin{
  email?: string;
  username?: string;
  password: string;
}

export interface IUserResendcode{
  email: string;
}

export type IUserRegisterInput = TypeOf<typeof UserRegisterInputSchema>