const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');

// serialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean();
    done(null, user || null);
  } catch (err) {
    done(err, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const providerId = profile.id;
        let user = await User.findOne({ provider: 'google', providerId });

        if (!user) {
          user = new User({
            provider: 'google',
            providerId,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value || '',
            photo: profile.photos?.[0]?.value || '',
          });
          await user.save();
        } else {
          // update small fields
          user.displayName = profile.displayName;
          user.email = profile.emails?.[0]?.value || user.email;
          user.photo = profile.photos?.[0]?.value || user.photo;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
