import passport from 'passport';
import GoogleOAuth2 from 'passport-google-oauth20';
import {HttpsProxyAgent} from "https-proxy-agent";

const GoogleStrategy = GoogleOAuth2.Strategy;

const googleStrategy = new GoogleStrategy({
    // options for the google strategy
    // 使用google api 对我们网站上的人员进行身份验证
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: '/auth/google/callback', // do not write http://localhost:3000/auth/...
    // passReqToCallback: false
}, (accessToken, refreshToken, profile, done) => {
    // passport callback function 这个callback function将在身份验证的某个时刻触发
    console.log('passport callback function fired')
    console.log('profile---', profile)
    // done(null, profile)
})

// 设置代理 in China
const agent = new HttpsProxyAgent(process.env.HTTP_PROXY!)
// @ts-ignore
googleStrategy._oauth2.setAgent(agent)

passport.use(googleStrategy)

