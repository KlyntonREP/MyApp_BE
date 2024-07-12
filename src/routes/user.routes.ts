import express from 'express';
import {
    createUserController,
    verifyEmailController,
    UserLoginController,
    resendCodeController,
    forgotPassEmailController,
    forgotPassPhoneController,
    resetPassController,
    updateProfilerController,
    followController,
    unfollowController,
    getProfileController,
    getUserByIdController,
    editEmailController,
    changeEmailController,
    getAccessTokenController,
    signOutController,
} from '../controllers/index';
import { Authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validateResource';
import {
    ChangeEmailDto,
    EditEmailDto,
    EditProfileDto,
    EmailVerifyDto,
    ForgotPassEmailDto,
    ForgotPassPhoneDto,
    GetAccessTokenDto,
    LoginDto,
    RegisterUserDto,
    ResendcodeDto,
    ResetPassDto,
} from '../dto';

const router = express.Router();

router.post('/register', validate(RegisterUserDto), createUserController);
router.post('/resend-code', validate(ResendcodeDto), resendCodeController);
router.post('/verify', validate(EmailVerifyDto), verifyEmailController);
router.post('/login', validate(LoginDto), UserLoginController);
router.post('/get-accesstoken', validate(GetAccessTokenDto), getAccessTokenController);
router.post('/logOut', validate(GetAccessTokenDto), signOutController);
router.post('/forgot-password-email', validate(ForgotPassEmailDto), forgotPassEmailController);
router.post('/forgot-password-phone', validate(ForgotPassPhoneDto), forgotPassPhoneController);
router.post('/reset-password', validate(ResetPassDto), resetPassController);
router.put('/update-profile', Authenticate, validate(EditProfileDto), updateProfilerController);
router.post('/edit-email', Authenticate, validate(EditEmailDto), editEmailController);
router.put('/change-email', Authenticate, validate(ChangeEmailDto), changeEmailController);
router.get('/profile', Authenticate, getProfileController);
router.get('/profile/:userId', Authenticate, getUserByIdController);
router.post('/follow/:followId', Authenticate, followController);
router.post('/unfollow/:unfollowId', Authenticate, unfollowController);

export default router;
