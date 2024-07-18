import passport from "passport";
import { Strategy } from "passport-google-oauth20";

// set up passport
passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_ADDRESS,
    },
    // callback function on authorisation success
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

// serialize user when saving to session
passport.serializeUser((user, serialize) => {
  serialize(null, user);
});

// deserialize user when reading from session
passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
});

export default passport;
