import { useContext } from "react";
import { StockContext } from "../context/StockContext";
import { Link } from "react-router-dom";
import stockListImage from "../assets/clipboard.png";
function Home() {
  const { handleCreateStock, setProductName, setQuantity, setDate, setStatus } =
    useContext(StockContext);

  const options = {
    active: "Active",
    inactive: "Inactive",
  };

  return (
    <>
      <div className="w-[100%] h-[100vh] flex  items-center justify-center  ">
        <div className="flex flex-col items-center py-10  bg-white rounded-md drop-shadow-2xl   w-[30%]  ">
          <h1 className="font-bold text-2xl">Create Stock</h1>
          <div className="flex flex-col w-[90%] gap-3 ">
            <label className="flex flex-col">
              Product Name
              <input
                onChange={(e) => setProductName(e.target.value.toUpperCase())}
                className="px-10 border"
                type="text"
              />
            </label>
            <label className="flex flex-col">
              Quantity
              <input
                onChange={(e) => setQuantity(e.target.value)}
                className="px-10 border"
                type="text"
              />
            </label>
            <label className="flex flex-col">
              Stock Date
              <input
                onChange={(e) => setDate(e.target.value)}
                className="px-10 border"
                type="date"
              />
            </label>
            <label className="w-[90%] flex-col flex">
              Status
              <select
                className="border w-[40%]"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select</option>
                <option value={options.active}>Active</option>
                <option value={options.inactive}>Inactive</option>
              </select>
            </label>
            <div className="flex flex-row items-center justify-between">
              {" "}
              <button
                onClick={handleCreateStock}
                className="w-[20%] h-[5vh] rounded-md bg-orange-700"
              >
                Create
              </button>{" "}
              <Link to={"/stocklist"}>
                <img
                  className="px-5 py-1   h-[5vh] rounded-md bg-blue-500 "
                  src={stockListImage}
                  alt="  List Page"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
