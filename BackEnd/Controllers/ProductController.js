const TopWear = require("../Models/TopWearModel");
const BottomWear = require("../Models/BottomWearModel");

exports.getAllProducts = async (req, res, next) => {
  try {
    const topWear = await TopWear.find();
    const bvottomWear = await BottomWear.find();
    const products=topWear.concat(bvottomWear);
    res.status(200).json({
      status: "Success",
      data: [products],
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      data: [],
    });
  }
  next();
};