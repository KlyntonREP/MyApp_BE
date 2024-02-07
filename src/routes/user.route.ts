import express from 'express';
import {
  createUserController,
  verifyUserController,
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
router.put('/update-profile', Authenticate, updateProfilerController);
router.post('/edit-email', Authenticate, editEmailController);
router.put('/change-email', Authenticate, changeEmailController);
router.get('/profile', Authenticate, getProfileController);
router.get('/profile/:userId', Authenticate, getUserByIdController)
router.post('/follow/:followId', Authenticate, followController);
router.post('/unfollow/:unfollowId', Authenticate, unfollowController);

export default router;