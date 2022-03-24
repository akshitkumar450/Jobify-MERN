import "./App.css";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/Dashboard/DashBoard";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stats from "./pages/Dashboard/Stats";
import AllJobs from "./pages/Dashboard/AllJobs";
import AddJob from "./pages/Dashboard/AddJob";
import Profile from "./pages/Dashboard/Profile";
import ProtectedRoute from "./pages/ProtectedRoutes";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<Stats />} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="add-job" element={<AddJob />} />
            <Route path="profile" element={<Profile />} />
          </Route>
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
