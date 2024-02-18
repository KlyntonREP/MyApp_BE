import express from 'express';
import {
    createpostController,
    getHomePageController
} from '../controllers/index';
import { Authenticate } from '../middlewares/auth.middleware';
// import validate from '../middlewares/validateResource';
import { upload } from "../utility/multer";

const router = express.Router();

router.post('/create-post', Authenticate, upload.fields([{ name: "image" }, { name: "video" }]), createpostController);
router.get('/get-posts', Authenticate, getHomePageController);

export default router;