import User from "../models/user.model"

const createUser = async (req: Request, res: Response) => {
	console.log('req.body---', req.body)
	const user = new User({
		username: req.body.username,
		password: req.body.password
	})
	user.save().then(function (u) {
		res.json({message: 'done', data: u});
	}).catch(function (err) {
		res.json({message: 'error', data: err});
	});
}

const findUserWithPassword = async (req: Request, res: Response) => {
	User.findOne({username: req.body.username}).then(function (u) {
		if (!u) {
			res.json({message: 'user not found'});
		} else {
			u.verifyPassword(req.body.password, function (err, match) {
				if (err) {
					res.json({message: 'error', data: err});
				} else {
					if (match) {
						// 不要返回密码
						res.json({
							message: 'done',
							data: {
								_id: u._id,
								username: u.username
							}
						});
					} else {
						res.json({message: 'invalid password'});
					}
				}
			});
		}
	})
}

const updateUser = async (req: Request, res: Response) => {
	User.findOne({username: req.body.username}).then(function (u) {
		if (!u) {
			res.json({message: 'user not found'});
		} else {
			u.verifyPassword(req.body.password, function (err, match) {
				if (err) {
					res.json({message: 'error', data: err});
				} else {
					if (match) {
						// 若newPassword不存在，则会报Path password is required错误
						u.password = req.body.newPassword;
						u.save().then(function (u) {
							res.json({message: 'done', data: u});
						}).catch(function (err) {
							res.json({message: 'error', data: err});
						});
					} else {
						res.json({message: 'invalid password'});
					}
				}
			})
		}
	})
}

const findUsers = async (req: Request, res: Response) => {
	// User.find()
	User.find({}).exec().then(function (users) {
		res.json({message: 'done', data: users});
	}).catch(function (err) {
		res.json({message: 'error', data: err});
	});
}

const findUser = async (req: Request, res: Response) => {
	User.findOne({_id: req.params.id}).then(function (user) {
		res.json({message: 'done', data: user});
	}).catch(function (err) {
		res.json({message: 'error', data: err});
	});
}

export default {
	createUser,
	findUsers,
	findUser,
	updateUser,
	findUserWithPassword,
}