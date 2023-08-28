import express from 'express';
import {
  createUserController,
} from '../controllers/index';
// import { Authenticate } from '../middlewares';
import validate from '../middlewares/validateResource';
import { UserRegisterInputSchema } from '../dto';

const router = express.Router();

router.post('/register', validate(UserRegisterInputSchema), createUserController); 

export default router;