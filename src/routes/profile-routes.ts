import {Router} from "express"

const router = Router()

const authCheck= (req, res, next) => {
    if (!req.user) {
        // if user is not logged in
        res.redirect('/auth/login')
    }else{
        // if logged in
        next()
    }
}

router.get('/', (req, res) => {
    if (req.isAuthenticated()){
        res.send('you are logged in, this is your profile - ' + req.user!.username)
    }else{
        res.redirect('/auth/login')
    }
})

export default router