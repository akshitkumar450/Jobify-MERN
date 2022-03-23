import "./App.css";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Register from "./pages/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route
            path="/*"
            element={
              <div className="text-red-500 text-5xl text-center">
                Page Not Found
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={1000} />
    </>
  );
}

export default App;
