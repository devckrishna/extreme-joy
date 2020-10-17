const Cart = require("../Models/cartModel");

exports.addToCart = async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body);
    return res.status(200).json({
      status: "Success",
      data: [cart],
    });
  } catch (err) {
    return res.status(404).json({
      status: "Fail",
      data: [],
    });
  }
  
};
