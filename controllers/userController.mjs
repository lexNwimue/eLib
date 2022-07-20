import userModel from "../model/UserModel.mjs";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";

// Handle Signup
const user_signup_get = (req, res) => {
  res.render("signup", { title: "User Dashboard" });
};

const expirationDuration = 7 * 24 * 60 * 60;
const createJWTtoken = (id) => {
  return jwt.sign({ id }, "my secret code goes here", {
    expiresIn: expirationDuration,
  });
};

const user_signup_post = (req, res) => {
  const errors = [];
  let password = req.body.password;
  const password2 = req.body.password2;
  const name = req.body.name;
  const email = req.body.email;
  if (password !== password2) {
    errors.push({ msg: "Unmatching passwords" });
    console.log(email + ": Unmatching passwords");
    res.render("signup", { errors });
  } else if (password.length < 6) {
    errors.push({ msg: "Password must be at least six characters" });
    res.render("signup", { errors });
  } else {
    userModel.User.findOne({ email: email })
      .then((result) => {
        if (result) {
          errors.push({ msg: "Email already exists" });
          console.log(email + " already exists in the DB");
          res.render("signup", { errors });
        } else {
          // Encrypt password before saving to DB
          bcrypt
            .hash(password, 10)
            .then((hash) => {
              const newUser = new userModel.User({
                name: name,
                email: email,
                password: password,
              });

              newUser
                .save()
                .then((user) => {
                  const token = createJWTtoken(user._id);
                  res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: expirationDuration * 1000,
                  });
                  res.json({ user: user._id });
                })
                .catch((e) => console.log(e));
            })
            .catch((e) => console.log(e));
        }
      })
      .catch((e) => console.log(e));
  }
};

// Handle Sign-in
const user_signin_get = (req, res) => {
  res.render("signin");
};
const user_signin_post = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard/admin",
    failureRedirect: "/user/signin",
    failureFlash: true,
  })(req, res, next);
};

const user_signout_get = (req, res) => {
  req.logout();
  res.redirect(302, "/user/signin");
};

const user_listAll_get = (req, res) => {
  res.render("allUsers", { users });
};

export default {
  user_signup_post,
  user_signup_get,
  user_signin_get,
  user_signin_post,
  user_signout_get,
  user_listAll_get,
};
