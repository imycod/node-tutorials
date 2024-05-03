import express, {Express, Request, Response} from 'express';

const app: Express = express()

app.set('view engine', 'ejs');

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!111')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})