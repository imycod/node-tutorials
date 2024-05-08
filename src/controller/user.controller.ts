import User from "../models/user.model"

const createUser = async (req: Request, res: Response) => {
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
						res.json({message: 'done', data: u});
					} else {
						res.json({message: 'invalid password'});
					}
				}
			});
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

export default {
	createUser,
	findUserWithPassword,
	findUsers
}