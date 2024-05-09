import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'

import User from "../models/user.model";

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.findOne({username: username}, function (err: Error | null, user: any) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false);
			}
			if (!user.verifyPassword(password)) {
				return done(null, false);
			}
			return done(null, user);
		});
	}
));