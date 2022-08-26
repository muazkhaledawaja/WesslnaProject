const createError = require("http-errors");
const mongoose = require("mongoose");

const Seller = require("../Models/Seller.model");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const tokenSecret = "my-token-secret";

module.exports = {
  getAllSellers: async (req, res, next) => {
    try {
      const results = await Seller.find({}, { __v: 0 });
      // const results = await Customer.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Customer.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      next(error);
    }
  },

  findSellerById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const seller = await Seller.findOne({ _id: id });
      if (!seller) {
        throw createError(404, "Seller does not exist.");
      }
      const { pass, ...rest } = seller;
      const { password, ...resa } = rest._doc;

      res.status(200).send(resa);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Seller id"));
        return;
      }
      next(error);
    }
  },

  updateASeller: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Seller.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Seller does not exist");
      }
      res.send(result);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Seller Id"));
      }

      next(error);
    }
  },

  deleteASeller: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Seller.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, "Seller does not exist.");
      }
      res.send(result);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Seller id"));
        return;
      }
      next(error);
    }
  },

  loginSeller: async (req, res) => {
    await Seller.findOne({ email: req.body.email })
      .then((user) => {
        if (!user)
          res
            .status(404)
            .json({ message: "Seller does not exist with that email." });
        else {
          bcrypt.compare(req.body.password, user.password, (error, match) => {
            if (error) res.status(500).json({ message: error.message });
            else if (match)
              res.status(200).json({ token: generateToken(user) });
            else res.status(403).json({ message: "The password is wrong" });
          });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });
  },

  createNewSeller: async (req, res, next) => {
    try {
      const seller = new Seller(req.body);
      const result = await seller.save();
      res.send(result);
    } catch (error) {
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  signupSeller: async (req, res, next) => {
    try {
      const salt = await bcrypt.hash(req.body.password, 10);
      const newSeller = new Seller({
        email: req.body.email,
        password: salt,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        verified: false,
        date: new Date(),
      });
      const result = await newSeller.save();
      res.send(result);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        return next(createError(500, "Invalid Seller Id"));
      }
      next(error);
    }
  },

  jwtTest: async (req, res) => {
    res.status(200).json(req.user);
  },
};

function generateToken(seller) {
  return jwt.sign({ data: seller }, tokenSecret, { expiresIn: "24h" });
}
