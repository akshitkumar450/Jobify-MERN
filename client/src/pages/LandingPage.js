import React from "react";
import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="pt-10">
        <img src={logo} alt="logo" />
      </div>
      <div className="grid md:grid-cols-2 justify-center md:justify-start items-center mt-20">
        <div className="col-span-1">
          <h1>Job App</h1>
          <div>
            <Link to="/register">
              <Button variant="contained">Login / Register</Button>
            </Link>
          </div>
        </div>
        <div className="col-span-1 hidden md:block">
          <img src={main} className="w-full object-contain" alt="main-img" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
