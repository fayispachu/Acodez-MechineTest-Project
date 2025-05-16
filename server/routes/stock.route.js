const express = require("express");
const {
  createStockDetails,
  getStockList,
  takeOneStock,
  updateOneStock,
  deleteOneStock,
} = require("../controller/stock.controller");
const stockRouter = express.Router();

stockRouter.post("/create", createStockDetails);
stockRouter.get("/stocklist", getStockList);
stockRouter.get("/onestock/:id", takeOneStock);
stockRouter.put("/update/:id", updateOneStock);
stockRouter.delete("/deletestock/:id", deleteOneStock);
module.exports = { stockRouter };
