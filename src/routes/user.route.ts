import express from 'express';
import {
  createUserController,
  verifyUserController,
} from '../controllers/index';
// import { Authenticate } from '../middlewares';
import validate from '../middlewares/validateResource';
import { UserRegisterInputSchema } from '../dto';

const router = express.Router();

router.post('/register', validate(UserRegisterInputSchema), createUserController);
router.post('/verify', verifyUserController); 

export default router;