import express from 'express';
import {
  createUserController,
  verifyUserController,
  UserLoginController,
  resendCodeController
} from '../controllers/index';
// import { Authenticate } from '../middlewares';
import validate from '../middlewares/validateResource';
import { UserRegisterInputSchema } from '../dto';

const router = express.Router();

router.post('/register', validate(UserRegisterInputSchema), createUserController);
router.post('/resend-code', resendCodeController);
router.post('/verify', verifyUserController);
router.post('/login', UserLoginController);  

export default router;