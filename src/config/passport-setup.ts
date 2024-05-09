import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'

import User from "../models/user.model";

passport.use(new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password'
	},
	function (username, password, done) {
		User.findOne({username: username}).then(function (u) {
			if (!u) {
				const error = new Error('user not found.');
				return done(error, false);
			} else {
				u.verifyPassword(password, function (err, match) {
					if (match) {
						return done(null, u);
					} else {
						const error = new Error('Incorrect password');
						return done(error, false);
					}
				});
			}
		})
	}
));

const isAuthenticated = passport.authenticate('local', {
	session: false,
	failWithError: true
})

export {
	isAuthenticated
}