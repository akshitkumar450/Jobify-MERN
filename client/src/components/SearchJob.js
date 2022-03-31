import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SearchJob() {
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const onSubmit = () => {};
  return (
    <section className="max-w-5xl mx-auto mb-10">
      <div className=" overflow-hidden rounded-md  bg-gray-200 mx-auto p-5">
        <form onSubmit={onSubmit} className="grid grid-cols-3 gap-5">
          <div>
            <input
              type="text"
              className="w-full h-10 rounded-md p-2"
              value={company}
              placeholder="company"
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full h-10 rounded-md p-2"
              value={position}
              placeholder="postion"
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              className="w-full h-10 rounded-md p-2"
              value={location}
              placeholder="location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label1">status</InputLabel>
              <Select
                labelId="demo-simple-select-label1"
                id="demo-simple-select1"
                value={status}
                label="status"
                className="w-full bg-white"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="interview">interview</MenuItem>
                <MenuItem value="declined">declined</MenuItem>
                <MenuItem value="pending">pending</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label2">type</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                value={type}
                label="type"
                className="w-full bg-white"
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="full-time">full-time</MenuItem>
                <MenuItem value="part-time">part-time</MenuItem>
                <MenuItem value="remote">remote</MenuItem>
                <MenuItem value="internship">internship</MenuItem>
              </Select>
            </FormControl>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchJob;
