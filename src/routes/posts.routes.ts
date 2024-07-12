import express from 'express';
import { createpostController, getHomePageController } from '../controllers/index';
import { Authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validateResource';
import { CreatePostDto } from '../dto';
// import { upload } from '../utility/multer';

const router = express.Router();

router.post('/create-post', Authenticate, validate(CreatePostDto), createpostController);
router.get('/get-posts', Authenticate, getHomePageController);

export default router;
