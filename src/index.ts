import express, {Express, Request, Response} from 'express';
import path from 'path';
import {configDotenv} from "dotenv";
import moogoose from 'mongoose';
import authRoutes from "./routes/auth-routes";

import("./config/passport-setup");

configDotenv(); // require('dotenv').config() | dotenv.config() by default

const app: Express = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views')); // 执行的目录是dist，因此需要回退到src目录
app.use(express.static(path.join(__dirname, '../src/views'))); // 执行的目录是dist，因此需要回退到src目录

moogoose.connect(process.env.MONGODB_URI as string)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error)
    })

app.use('/auth', authRoutes);
app.get('/', (req: Request, res: Response) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})