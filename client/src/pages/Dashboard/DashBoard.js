import React from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
function DashBoard() {
  return (
    <div>
      <Navbar />

      {/* for nested pages to be shown */}
      <Outlet />
    </div>
  );
}

export default DashBoard;
