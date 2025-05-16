const express = require("express");
const { default: mongoose } = require("mongoose");
const { stockRouter } = require("./routes/stock.route");
require("dotenv").config();
const app = express();
const PORT = 4000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongo db Connected Successfully");
  })
  .catch((err) => console.log("Mongodb connection faild", err));

app.use("/api/stock", stockRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
