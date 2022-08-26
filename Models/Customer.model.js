const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
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
  },
  orders: {
    type: Array,
    required: false,
  },
  cart: {
    type: Array,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Customer = mongoose.model("customer", CustomerSchema);
module.exports = Customer;
