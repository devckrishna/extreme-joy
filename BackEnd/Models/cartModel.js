const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  name: String,
  email: String,
  cart: [
    {
      title: {
        type: String,
        required: [true, "A TopWear must have a name"],
      },
      subtitle: {
        type: String,
        required: [true, "A TopWear must have a subtitle"],
      },
      size: {
        type: String,
        required: [true, "A TopWear must have a subtitle"],
      },
      photos: {
        type: String,
        required: [true, "A TopWear must have a subtitle"],
      },
      description: {
        type: String,
        required: [true, "A TopWear must have a subtitle"],
      },
      sleveLength: {
        type: String,
      },
      neck: {
        type: String,
      },
      occasion: {
        type: String,
        required: [true, "A TopWear must have a subtitle"],
      },
      gender: {
        type: String,
        required: [true, "A TopWear must have a subtitle"],
      },
      price: {
        type: Number,
        required: [true, "A TopWear must have a subtitle"],
      },
      category: {
        type: String,
        required: [true, "A TopWear must have a subtitle"],
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
