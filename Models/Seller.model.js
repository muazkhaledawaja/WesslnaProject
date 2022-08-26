const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const SellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  description: {
    type: String,
    required: false,
  },
  _products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Products",
    },
  ],
  date: {
    type: Date,
    required: true,
  },
});

const Seller = mongoose.model("seller", SellerSchema);
module.exports = Seller;
