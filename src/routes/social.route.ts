import express from 'express';
// import passport from 'passport';
// import {
//   googleAuthController,
// } from '../controllers/index';

const router = express.Router();

// router.get('/google', googleAuthController)
// router.get('/google/callback',
//       passport.authenticate('google', {
//         failureRedirect: '/failed',
//   }),function (req, res) {
//     console.log('Authentication successful:', req.user);
//     res.redirect('/success')

//   })

  router.get('/success', (req, res) => {
    res.send('Success!')
  })
  router.get('/failed', (req, res) => {
    res.send('Something went wrong')
  })

export default router;