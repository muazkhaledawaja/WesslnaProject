const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Products = mongoose.model("product", ProductsSchema);
module.exports = Products;
