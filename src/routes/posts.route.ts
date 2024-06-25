import express from 'express';
import { createpostController, getHomePageController } from '../controllers/index';
import { Authenticate } from '../middlewares/auth.middleware';
// import { upload } from '../utility/multer';

const router = express.Router();

router.post('/create-post', Authenticate, createpostController);
router.get('/get-posts', Authenticate, getHomePageController);

export default router;
