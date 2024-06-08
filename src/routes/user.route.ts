import {Router} from "express";

import UserController from "../controller/user.controller";

// @ts-ignore
const router = new Router();

router.get('/list', UserController.findUsers)

router.post('/create', UserController.createUser)

router.put('/update', UserController.updateUser)

router.delete('/:id', UserController.deleteUserById)

router.get('/:id', UserController.findUserById)

export default router