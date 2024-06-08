const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;

const AuthenticationError = require("./error/authentication");

passport.use(
  new LocalStrategy((username, password, done) => {
    if (username === "admin" && password === "admin") {
      return done(null, { username: "admin" });
    } else {
      return done(
        new AuthenticationError("Invalid username/password", 401),
        false
      );
    }
  })
);

passport.use(
  new BearerStrategy((token, done) => {
    return done(null, { username: "admin" });
  })
);
