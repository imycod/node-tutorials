// create Router instance
import {Router} from 'express';

const router = Router();

// auth/login
router.get('/login', (req, res) => {
    res.render('login')
})

// auth/logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out')
})

// auth/google
router.get('/google', (req, res) => {
    // handle with passport
    res.send('logging in with google')
})

export default router;