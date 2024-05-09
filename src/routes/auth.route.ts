import {Router} from "express";
import {isAuthenticated} from "../config/passport-setup";

// @ts-ignore
const router = new Router();

router.post('/login', isAuthenticated, (req, res) => {
		console.log('1111')
		res.send({
			message: 'done',
			data: req.user
		})
	},
	(err, req, res) => {
		// 这是一个错误处理中间件，当身份验证失败时，Passport.js 会调用这个中间件
		// err 是一个包含错误信息的对象
		console.log(err)
		res.send({
			message: 'error',
			data: err
		})
	}
)

export default router