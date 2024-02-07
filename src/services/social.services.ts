import { UserModel } from "../models/index";
import passport from 'passport';

export const googleAuthService = async(req: any, res:any, next: any) =>{
    try{
        passport.authenticate('google', {scope: ['email', 'profile']
          }, (err, user, info) => {
            console.log(user)
          })(req, res, next);
    }catch(error){
        console.log(error);
        return{status: 500, message: "Internal Server Error", data: error}
    }
    
}
  
  exports.googleCallback = passport.authenticate('google', {
    failureRedirect: '/failed'
  }, function (req, res) {
    res.redirect('/success');
  });