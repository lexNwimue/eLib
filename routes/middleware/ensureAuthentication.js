import jwt from "jsonwebtoken";
import userModel from "../../model/UserModel.mjs";

const ensureAuthentication = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.redirect(301, "/user/signin");
  } else {
    jwt.verify(token, "my secret code goes here", (err, verifiedToken) => {
      if (err) {
        res.redirect(301, "/user/signin");
      } else {
        next();
      }
    });
  }
};

const ensureAdminAuthentication = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.redirect(301, "/user/signin");
  } else {
    jwt.verify(
      token,
      "my secret code goes here",
      async (err, verifiedToken) => {
        if (err) {
          res.redirect(301, "/user/signin");
        } else {
          const user = await userModel.User.findById(verifiedToken.id);
          if (user.role !== "admin") {
            res.redirect(401, "/user/signin");
          } else {
            next();
          }
        }
      }
    );
  }
};

export { ensureAuthentication, ensureAdminAuthentication };
