import React from "react";
import { useContext } from "react";
import { StockContext } from "../context/StockContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import goback from "../assets/back.png";
function StockList() {
  const {
    stockList,
    handleGetOneStock,
    oneStock,
    handleUpdateStock,
    setOneStock,
    handleDeleteStock,
  } = useContext(StockContext);

  const [edit, setEdit] = useState(null);

  const handleEdit = async (id) => {
    await handleGetOneStock(id);
    setEdit(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOneStock({ ...oneStock, [name]: value });
  };

  const handleSave = async (id) => {
    await handleUpdateStock(id);
    setEdit(null);
  };

  const [filter, setFiltter] = useState({
    productName: "All",
    status: "All",
    fromDate: "",
    toDate: "",
    searchTerm: "",
  });

  const filteredList = stockList.filter((item) => {
    const statusSetupMatch =
      filter.status === "All" ||
      item.status.toLowerCase() === filter.status.toLowerCase();

    const productSetupMatch =
      filter.productName === "All" || item.productName === filter.productName;
    const itemDate = new Date(item.date);
    const from = filter.formDate ? new Date(filter.formDate) : null;
    const to = filter.toDate ? new Date(filter.toDate) : null;
    const dateMatchSetup =
      (!from || itemDate >= from) && (!to || itemDate <= to);
    const searchMatchSetup =
      item.productName
        .toLowerCase()
        .includes(filter.searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(filter.searchTerm.toLowerCase());

    return (
      statusSetupMatch &&
      productSetupMatch &&
      dateMatchSetup &&
      searchMatchSetup
    );
  });

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="w-[100%]  bg-gray-50 flex flex-col ">
        <div className="w-[100%] h-auto  flex items-start flex-col justify-start bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col items-start  justify-start">
            {" "}
            <Link to={"/"}>
              <img src={goback} alt="Go back" className=" " />
            </Link>
            <div className="flex flex-col gap-3">
              <h1 className=" text-xl">Filter</h1>{" "}
              <div className="flex flex-row gap-1">
                {" "}
                {/* Search term */}
                <label htmlFor="" className="flex flex-col">
                  <strong> Search</strong>{" "}
                  <input
                    type="text"
                    placeholder="Search stocks..."
                    value={filter.searchTerm}
                    onChange={(e) =>
                      setFiltter({ ...filter, searchTerm: e.target.value })
                    }
                    className="border px-2 py-1 rounded "
                  />
                </label>
                {/* from date */}
                <label className="flex flex-col">
                  <strong>From</strong>
                  <input
                    type="date"
                    value={filter.formDate}
                    onChange={(e) =>
                      setFiltter({ ...filter, formDate: e.target.value })
                    }
                    className="border px-2 py-1"
                  />
                </label>
                {/* to date */}
                <label htmlFor="" className="flex flex-col">
                  <strong>To</strong>{" "}
                  <input
                    type="date"
                    value={filter.toDate}
                    onChange={(e) =>
                      setFiltter({ ...filter, toDate: e.target.value })
                    }
                    className="border px-2 py-1 "
                  />
                </label>
                {/* Filter */}
                <label className="flex flex-col">
                  <strong>Status</strong>
                  <select
                    className="border px-3 py-1 "
                    name="status"
                    value={filter.status}
                    onChange={(e) =>
                      setFiltter({ ...filter, status: e.target.value })
                    }
                  >
                    <option value="All">Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </label>
                {/* find with name  */}
                <label className="flex flex-col">
                  <strong>Stock</strong>
                  <select
                    value={filter.productName}
                    onChange={(e) =>
                      setFiltter({ ...filter, productName: e.target.value })
                    }
                    className="border px-2 py-1  "
                  >
                    <option value="All">All Stocks</option>
                    {Array.from(
                      new Set(stockList.map((s) => s.productName))
                    ).map((name, index) => (
                      <option value={name} key={index}>
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>
          <table className="border w-[100%] table-auto border-collapse ">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-5 py-2 border">Product ID</th>

                <th className="px-5 py-2 border">Product Name</th>
                <th className="px-5 py-2 border">Quantity</th>
                <th className="px-5 py-2 border">Status</th>
                <th className="px-5 py-2 border">Date</th>
                <th className="px-5 py-2 border ">Actions</th>
              </tr>
            </thead>
            {/* table body start */}
            <tbody>
              {filteredList.map((item) => (
                <tr key={item._id}>
                  <td className="px-5 py-2 border ">{item?._id}</td>

                  {edit === item._id ? (
                    <>
                      <td className="px-5 py-2 border">
                        <input
                          type="text"
                          name="productName"
                          value={oneStock.productName || ""}
                          onChange={handleChange}
                          className="border px-2"
                        />
                      </td>
                      <td className="px-5 py-2 border">
                        <input
                          type="text"
                          name="quantity"
                          value={oneStock.quantity || ""}
                          onChange={handleChange}
                          className="border px-2"
                        />
                      </td>
                      <td className="px-5 py-2 border">
                        <input
                          type="text"
                          name="status"
                          value={oneStock.status || ""}
                          onChange={handleChange}
                          className="border px-2"
                        />
                      </td>
                      <td className="px-5 py-2 border">
                        <input
                          type="text"
                          name="date"
                          value={oneStock.date || ""}
                          onChange={handleChange}
                          className="border px-2"
                        />
                      </td>

                      <button
                        onClick={() => {
                          handleRefresh();
                          handleSave(item._id);
                        }}
                        className="bg-green-500 text-white px-5 py-2"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <td className="px-5 py-2 border  ">
                        {item?.productName}
                      </td>
                      <td className="px-5 py-2 border">{item?.quantity}</td>
                      <td className="px-5 py-2 border">{item?.status}</td>
                      <td className="px-5 py-2 border">{item?.date}</td>
                      <td className="px-4 py-2 border">
                        <div className="flex gap-2">
                          {" "}
                          <button
                            onClick={() => {
                              handleEdit(item._id);
                            }}
                            className="bg-blue-500 border px-4 py-2 text-black"
                          >
                            Edit
                          </button>{" "}
                          <button
                            className="bg-red-500 border  px-4 py-2"
                            onClick={() => handleDeleteStock(item._id)}
                          >
                            {" "}
                            Delete
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default StockList;
