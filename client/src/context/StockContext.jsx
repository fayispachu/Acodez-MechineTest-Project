import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
export const StockContext = createContext();

export const StockDetailsProvider = ({ children }) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  //    getStock list

  const [stockList, setStockList] = useState([]);

  // one stock
  const [oneStock, setOneStock] = useState({});
  const handleCreateStock = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/stock/create",
        { productName, quantity, date, status }
      );

      console.log("Stock Successfully Created:", data);
      handleGetStockList();
      alert("Stock create successfull");
    } catch (error) {
      console.log("Error from handleCreateStock", error);
    }
  };

  const handleGetStockList = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/stock/stocklist"
      );
      console.log("data is:", data.data);
      setStockList(data.data);
    } catch (error) {
      console.log("Error from frontend getStockList", error);
    }
  };

  const handleGetOneStock = async (id) => {
    if (!id) {
      console.log("Id indefined", id);
    }

    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/stock/onestock/${id}`
      );
      console.log(data, "one list");

      setOneStock(data.oneStock);
    } catch (error) {
      console.log(error, "error in handleGetOneTask");
    }
  };

  const handleUpdateStock = async (id) => {
    try {
      const { productName, quantity, date, status } = oneStock;

      const { data } = await axios.put(
        `http://localhost:4000/api/stock/update/${id}`,
        { productName, quantity, date, status }
      );

      console.log("Stock Updated: ", data);
      alert("Stock updated Successfull");
    } catch (error) {
      console.log("Error in handleUpdate", error);
    }
  };

  useEffect(() => {
    handleGetStockList();
  }, []);

  const handleDeleteStock = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/stock/deletestock/${id}`
      );
      console.log("Deleted:", data);
      handleGetStockList();
    } catch (error) {
      console.log("Error deleting stock", error);
    }
  };

  return (
    <StockContext.Provider
      value={{
        handleCreateStock,
        setProductName,
        setQuantity,
        setDate,
        date,
        setStatus,
        status,
        stockList,
        handleGetOneStock,
        oneStock,
        setOneStock,
        quantity,
        productName,
        handleUpdateStock,
        handleDeleteStock,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};
