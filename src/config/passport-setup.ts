import passport from 'passport';
import GoogleOAuth2 from 'passport-google-oauth20';
import {HttpsProxyAgent} from "https-proxy-agent";
import User from "../models/user.model"

const GoogleStrategy = GoogleOAuth2.Strategy;

passport.serializeUser((user,done)=>{
    // 调用这个函数，这个函数会自动的把id传递到某个地方，这个地方会把id放到cookie里面
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    // 当用户下次访问我们的网站的时候，我们会拿到cookie里面的id，去找到这个用户
    User.findById(id).then((user)=> {
        done(null, user) // 找到后把这个用户传递到下个stage
    })
})

const googleStrategy = new GoogleStrategy({
    // options for the google strategy
    // 使用google api 对我们网站上的人员进行身份验证
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: '/auth/google/callback', // do not write http://localhost:3000/auth/...
    // passReqToCallback: false
}, (accessToken, refreshToken, profile, done) => {
    // passport callback function 这个callback function将在身份验证的某个时刻触发
    // check if user already exists in our own db
    User.findOne({googleId: profile.id}).then((record) => {
        if (record) {
            // already have the user
            console.log('user is:', record)
            // 传递给 serializeUser
            done(null,record)
        } else {
            // if not, create user in our db
            // done(null, profile)
            new User({
                username: profile.displayName,
                googleId: profile.id
            }).save().then((newUser) => {
                console.log('new user created: ', newUser)
                done(null, newUser) // when we call done, it will call serializeUser
            })
        }
    })

})

// 设置代理 in China
const agent = new HttpsProxyAgent(process.env.HTTP_PROXY!)
// @ts-ignore
googleStrategy._oauth2.setAgent(agent)

passport.use(googleStrategy)

