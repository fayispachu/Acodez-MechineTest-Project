const { Stock } = require("../models/stock.model");

const createStockDetails = async (req, res) => {
  try {
    const { productName, quantity, date, status } = req.body;

    if (!productName || !quantity || !status || !date) {
      return res
        .status(400)
        .json({ message: "All fields are required from Backend" });
    }

    const newStockDetails = await Stock.create({
      productName,
      quantity,
      date,
      status,
    });

    console.log("Stock Created Successfully: ", newStockDetails);
    return res
      .status(200)
      .json({ message: "Stock Created Successfully:", newStockDetails });
  } catch (error) {
    console.log("Internal server Error in AddStock", error);
    return res
      .status(400)
      .json({ message: "Internal server Error in AddStock " });
  }
};

const getStockList = async (req, res) => {
  console.log("Get STOCK running started");

  try {
    const data = await Stock.find();
    if (!data) {
      return res
        .status(400)
        .json({ message: "Internal server Error Data not found " });
    }
    console.log("Stock Details : ", data);

    return res.status(200).json({ message: "Stock Details : ", data });
  } catch (error) {
    console.log("Internal server Error in getStockDetails", error);
    return res
      .status(400)
      .json({ message: "Internal server Error in getStockDetails " });
  }
};

const takeOneStock = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      console.log("iD not found");
    }
    console.log("id", id);

    const oneStock = await Stock.findById(id);
    console.log("oneStock", oneStock);

    return res.status(200).json({ message: "OneStock is:", oneStock });
  } catch (error) {
    console.log("Internal server Error in takeOneStock", error);
    return res
      .status(400)
      .json({ message: "Internal server Error in takeOneStock " });
  }
};

const updateOneStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, quantity, date, status } = req.body;
    const updatedStock = await Stock.findByIdAndUpdate(
      id,
      { productName, quantity, date, status },
      { new: true }
    );

    if (!updatedStock) {
      return res
        .status(400)
        .json({ message: "Stock not found in updateOneStock" });
    }
    return res
      .status(200)
      .json({ message: "Stock update successfully : ", updatedStock });
  } catch (error) {
    console.log("Internal server Error in UpdateOneStock", error);
    return res
      .status(400)
      .json({ message: "Internal server Error in UpdateOneStock " });
  }
};

const deleteOneStock = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStock = await Stock.findByIdAndDelete(id);
    if (!deletedStock) {
      return res.status(400).json({ message: "Stock not found for delete" });
    }
    return res
      .status(200)
      .json({ message: "Stock delete success in bckend", deletedStock });
  } catch (error) {
    console.log("Internal server error delete", error);
    return res.status(400).json({ message: "Internal server error delete" });
  }
};

module.exports = {
  createStockDetails,
  getStockList,
  takeOneStock,
  updateOneStock,
  deleteOneStock,
};
