import express, {Express, Request, Response} from 'express';
import path from 'path';
import cookieSession from 'cookie-session';
import {configDotenv} from "dotenv";
import moogoose from 'mongoose';
import authRoutes from "./routes/auth-routes";
import profileRoutes from "./routes/profile-routes"
import setupPassport from "./config/passport-setup";

configDotenv(); // require('dotenv').config() | dotenv.config() by default

const app: Express = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views')); // 执行的目录是dist，因此需要回退到src目录
app.use(express.static(path.join(__dirname, '../src/views'))); // 执行的目录是dist，因此需要回退到src目录
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // day = hour * minute * second * millisecond
    keys: [process.env.SESSION_COOKIE_KEY as string]
}));
// initialize passport
setupPassport(app)

moogoose.connect(process.env.MONGODB_URI as string)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error)
    })

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes)
app.get('/', (req: Request, res: Response) => {
    res.render('home',{user: req.user})
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})