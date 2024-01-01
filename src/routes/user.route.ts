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
  createpostController, 
} from '../controllers/index';
import { Authenticate } from '../middlewares/auth.middleware';
import validate from '../middlewares/validateResource';
import { UserRegisterInputSchema } from '../dto';
import passport from 'passport';

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
router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}))
router.get('/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/failed',
}),function (req, res) {
  res.redirect('/success')

})

router.get('/success', (req, res) => {
  res.send('Success!')
})
router.get('/failed', (req, res) => {
  res.send('Something went wrong')
})
export default router;