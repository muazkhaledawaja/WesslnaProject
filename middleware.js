const jwt = require("jsonwebtoken");
const tokenSecret = "my-token-secret";

exports.verify = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) res.status(403).json({ error: "please provide a token" });
  else {
    jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
      if (err) res.status(500).json({ error: "failed to authenticate token" });
      req.user = value.data;
      next();
    });
  }
};

exports.checkDuplicateNameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    name: req.body.name,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    // Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    });
  });
};
