import {Router} from "express";

import UserController from "../controller/user.controller";

const router = new Router();

router.get('/list', UserController.findUsers)

router.post('/create', UserController.createUser)

router.put('/update', UserController.updateUser)

router.get('/:id', UserController.findUser)

export default router