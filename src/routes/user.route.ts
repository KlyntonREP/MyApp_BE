import express from 'express';
import {
  createUserController,
  verifyUserController,
  UserLoginController,
  resendCodeController,
  forgotPassEmailController,
  forgotPassPhoneController,
  resetPassController,
  followController,
  unfollowController,
} from '../controllers/index';
import { Authenticate } from '../middlewares/auth.middleware';
import validate from '../middlewares/validateResource';
import { UserRegisterInputSchema } from '../dto';

const router = express.Router();

router.post('/register', validate(UserRegisterInputSchema), createUserController);
router.post('/resend-code', resendCodeController);
router.post('/verify', verifyUserController);
router.post('/login', UserLoginController);
router.post('/forgot-password-email', forgotPassEmailController);  
router.post('/forgot-password-phone', forgotPassPhoneController);  
router.post('/reset-password', resetPassController);
router.post('/follow/:followId', Authenticate, followController);
router.post('/unfollow/:unfollowId', Authenticate, unfollowController);
export default router;