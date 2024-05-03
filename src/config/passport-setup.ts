import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

passport.use(
    new GoogleStrategy({
        // options for the google strategy
    }),()=>{
        // passport callback function 这个callback function将在身份验证的某个时刻触发
    }
)