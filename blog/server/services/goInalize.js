const user = require("../model/user.schema");

require("dotenv").config();
const googleStretegy = require("passport-google-oauth20").Strategy;

const initalization = async (passport) => {
  passport.use(
    new googleStretegy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:8090/user/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log(profile);
        try {
          let data = await user.findOne({ email : profile.emails[0].value });
          
          if (!data || data == null) {
            let userdata = await user.create({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
              });
            let token = await userdata.genAuthToken();
            return done(null, { ...userdata.toObject(), token });
          } else {
            let token = await data.genAuthToken();
            done(null, { ...data.toObject(), token });
          }
        } catch (error) {
            done(error , false)
        }
    }));

    passport.serializeUser((user , done)=> {
        done(null , user._id);
    });

    passport.deserializeUser(async(id , done)=>{
      try {
        let data = await user.findById(id);
        done(null , data)
      } catch (error) {
        done(error , false);
      }
    });
};

module.exports = initalization;
