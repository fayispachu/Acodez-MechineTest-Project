import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { StockDetailsProvider } from "./context/StockContext";
import StockList from "./pages/StockList";

function App() {
  return (
    <>
      <BrowserRouter>
        <StockDetailsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stocklist" element={<StockList />} />
          </Routes>{" "}
        </StockDetailsProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
