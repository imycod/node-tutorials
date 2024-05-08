import {Router} from "express";

import UserController from "../controller/user.controller";

const router = new Router();

router.get('/list', UserController.findUsers)

router.post('/create', UserController.createUser)

export default router