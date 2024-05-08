import express, {Express, Request, Response} from 'express';
import mongoose from "mongoose";
const app: Express = express()

import userRoutes from './routes/user.route'

try{
    mongoose.connect('mongodb://localhost:27017/tutorial_db')
}catch (e) {
    console.log(e)
}

app.use(express.json())

app.use('/user', userRoutes)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})