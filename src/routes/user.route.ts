import express from 'express';
import {
  createUserController,
  verifyUserController,
  UserLoginController,
  resendCodeController,
  forgotPassController,
  resetPassController
} from '../controllers/index';
// import { Authenticate } from '../middlewares';
import validate from '../middlewares/validateResource';
import { UserRegisterInputSchema } from '../dto';

const router = express.Router();

router.post('/register', validate(UserRegisterInputSchema), createUserController);
router.post('/resend-code', resendCodeController);
router.post('/verify', verifyUserController);
router.post('/login', UserLoginController);
router.post('/forgot-password', forgotPassController);  
router.post('/reset-password', resetPassController);
export default router;