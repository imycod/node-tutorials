import {Router} from "express";
import UserController from "../controller/user.controller";

// @ts-ignore
const router = new Router();

router.post('/login', UserController.findUserWithPassword)

export default router