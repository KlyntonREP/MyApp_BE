// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// passport.serializeUser(function(user: any, done: any) {
//     done(null, user);
// });

// passport.deserializeUser(function(user: any, done: any) {
//     done(null, user);
// });

// passport.use(new GoogleStrategy({
//         clientID:"627974505381-o5c6mfj5b6jgmvrn0jod81tvp2a11g6q.apps.googleusercontent.com",
//         clientSecret:"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",
//         callbackURL: "http://localhost:3030/google/callback",
//         passReqToCallback   : true
//     },
//     function(request: any, accessToken: any, refreshToken: any, profile: any, done: any) {
//         return done(null, profile);
//     }
// ));