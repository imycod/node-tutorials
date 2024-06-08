/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2024-06-08 15:25:31
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2024-06-08 23:51:38
 * @FilePath: \passport-lesson-plans-exercises\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const passport = require("passport");
const express = require("express");
const session = require("express-session");

require("./passport-auth");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log("serializeUser", user);
  done(null, user);
});
passport.deserializeUser((user, done) => {
  console.log("deserializeUser", user);
  done(null, user);
});

app.post(
  "/login",
  passport.authenticate("local", { 
    successRedirect: "/",
    session: true
 }),
  (req, res) => {
    res.send({
      message: "登录成功",
      user: req.user,
    });
  }
);
app.get("/login", ensureLoggedOut(), (req, res) => {
  res.redirect("/static/login.html");
});

app.get(
  "/protected",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    res.send({
      message: "验证成功",
      data: {
        username: req.user.username,
        hoibbies: ["coding", "reading"],
        avatar: "http://www.baidu.com/1.jpg",
      },
    });
  }
);

app.get("/setting", ensureLoggedIn(), (req, res) => {
  res.send({
    message: "设置成功",
    data: {
      username: req.user.username,
      hoibbies: ["coding", "reading"],
      avatar: "http://www.baidu.com/1.jpg",
    },
  });
});

app.get("/", ensureLoggedIn(), (req, res) => {
  res.send("alive");
});

app.use((err, req, res, next) => {
  res.status(err.code || 500).send({
    message: err.message || "服务器错误",
  });
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
