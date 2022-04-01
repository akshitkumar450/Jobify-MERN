import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SearchJob({
  search,
  setSearch,
  sort,
  setSort,
  status,
  setStatus,
  type,
  setType,
}) {
  return (
    <section className="max-w-5xl mx-auto mb-10">
      <div className=" overflow-hidden rounded-md bg-gray-200 mx-auto p-5">
        <form className="grid grid-cols-3 gap-5">
          <div>
            <input
              type="text"
              className="w-full h-10 rounded-md p-2"
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
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
                <MenuItem value="all">all</MenuItem>
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
                <MenuItem value="all">all</MenuItem>
                <MenuItem value="full-time">full-time</MenuItem>
                <MenuItem value="part-time">part-time</MenuItem>
                <MenuItem value="remote">remote</MenuItem>
                <MenuItem value="internship">internship</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label2">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                value={sort}
                label="sort"
                className="w-full bg-white"
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="latest">latest</MenuItem>
                <MenuItem value="oldest">oldest</MenuItem>
                <MenuItem value="a-z">a-z</MenuItem>
                <MenuItem value="z-a">z-a</MenuItem>
              </Select>
            </FormControl>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchJob;
