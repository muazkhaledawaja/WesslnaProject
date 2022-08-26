const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
  total_amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "placed",
  },
  note: {
    type: String,
    required: false,
  },
  _products: [
    {
      type: Schema.ObjectID,
      ref: "Products",
    },
  ],
  _customer: {
    type: Schema.ObjectID,
    ref: "Customer",
  },
  _seller: {
    type: Schema.ObjectID,
    ref: "Seller",
  },
  date: {
    type: Date,
    required: true,
  },
});

const Products = mongoose.model("order", ProductsSchema);
module.exports = Products;
