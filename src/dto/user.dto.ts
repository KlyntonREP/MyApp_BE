import { IsDefined, IsNumberString, IsOptional, IsString, Length, Matches } from 'class-validator';

export class RegisterUserDto {
    @IsString()
    @IsDefined()
    firstName!: string;

    @IsString()
    @IsDefined()
    lastName!: string;

    @IsString()
    @IsDefined()
    userName!: string;

    @IsString()
    @IsDefined()
    @Matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        { message: 'Please enter a valid email' },
    )
    email!: string;

    @IsNumberString()
    @Length(13, 13)
    @IsOptional()
    phone!: string;

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{6,20}$/, {
        message: 'password must contain the following: a capital letter, a small letter, and a number',
    })
    password!: string;

    @IsString()
    @IsDefined()
    confirmPassword!: string;
}

export class EmailVerifyDto {
    @IsString()
    @IsDefined()
    otp!: string;

    @IsString()
    @IsDefined()
    email!: string;
}

export class LoginDto {
    @IsString()
    @IsOptional()
    @Matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        { message: 'Please enter a valid email' },
    )
    email?: string;

    @IsString()
    @IsOptional()
    username?: string;

    @IsString()
    @IsDefined()
    password!: string;
}

export class ResendcodeDto {
    @IsString()
    @IsDefined()
    @Matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        { message: 'Please enter a valid email' },
    )
    email!: string;
}

export class ForgotPassEmailDto {
    @IsString()
    @IsDefined()
    @Matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        { message: 'Please enter a valid email' },
    )
    email!: string;
}

export class ResetPassDto {
    @IsString()
    @IsDefined()
    @Matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        { message: 'Please enter a valid email' },
    )
    email!: string;

    @IsString()
    @IsDefined()
    code!: string;

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{6,20}$/, {
        message: 'password must contain the following: a capital letter, a small letter, and a number',
    })
    password!: string;

    @IsString()
    @IsDefined()
    confirmPassword!: string;
}

export class ForgotPassPhoneDto {
    @IsNumberString()
    @Length(13, 13)
    @IsOptional()
    phoneNumber!: string;
}

export class EditProfileDto {
    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    userName?: string;

    @IsString()
    @IsOptional()
    gender?: string;

    @IsString()
    @IsOptional()
    bio?: string;
}

export class EditEmailDto {
    @IsString()
    @IsDefined()
    @Matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        { message: 'Please enter a valid email' },
    )
    email!: string;
}

export class ChangeEmailDto {
    @IsString()
    @IsDefined()
    otp!: string;

    @IsString()
    @IsDefined()
    @Matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        { message: 'Please enter a valid email' },
    )
    email!: string;
}

export class CreatePostDto {
    @IsString()
    @IsDefined()
    caption!: string;
}

export class GetAccessTokenDto {
    @IsString()
    @IsDefined()
    refreshToken!: string;
}

// export type IUserRegisterInput = TypeOf<typeof UserRegisterInputSchema>;
