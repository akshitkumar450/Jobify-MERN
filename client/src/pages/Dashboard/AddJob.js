import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { jobService } from "../../services/jobService";
import { toast } from "react-toastify";
import {
  addJobAction,
  cancelEditAction,
  editJobAction,
} from "../../redux/actions/jobActions";
import { useNavigate } from "react-router-dom";

function AddJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editable = useSelector((state) => state.jobs.editable);
  const jobId = useSelector((state) => state.jobs.jobId);
  const job = useSelector((state) => state.jobs.job);

  const [position, setPosition] = useState(job?.position || "");
  const [company, setCompany] = useState(job?.company || "");
  const [location, setLocation] = useState(job?.jobLocation || "my-city");
  const [status, setStatus] = useState(job?.status || "pending");
  const [type, setType] = useState(job?.jobType || "full-time");

  useEffect(() => {
    if (editable) {
      const getJobById = async () => {
        try {
          const job = await jobService.getByJobId(jobId);
          const { company, position, jobLocation, jobType, status } =
            job.data.job;
          setPosition(position);
          setCompany(company);
          setLocation(jobLocation);
          setStatus(status);
          setType(jobType);
          dispatch(addJobAction(job?.data?.job));
        } catch (err) {
          toast.error(err.response.data.message);
        }
      };
      getJobById();
    }
  }, [jobId, dispatch, editable]);

  const defaultStates = () => {
    setPosition("");
    setType("");
    setStatus("");
    setCompany("");
    setLocation("");
  };

  const cancelEdit = () => {
    dispatch(cancelEditAction());
    defaultStates();
    navigate("/all-jobs");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!position || !company) {
        toast.error("please fill postion and company");
        return;
      }
      if (!editable) {
        // for adding
        const job = await jobService.addJob({
          position,
          company,
          status,
          jobLocation: location,
          type,
        });
        if (job?.data) {
          toast.success("added");
          defaultStates();
          navigate("/all-jobs");
        }
      } else {
        // for editing
        const updatedJob = await jobService.updateJob(jobId, {
          position,
          company,
          status,
          jobLocation: location,
          jobType: type,
        });
        if (updatedJob?.data) {
          toast.success("updated");
          dispatch(editJobAction(jobId, updatedJob.data.job));
          cancelEdit();
        }
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <section className="max-w-5xl mx-auto ">
      <div className="shadow-lg shadow-black overflow-hidden rounded-md mt-20 bg-gray-200 w-1/3 mx-auto p-5">
        <form onSubmit={onSubmit} className="space-y-5">
          <h1 className="text-center">{editable ? "Edit Job" : "Add Job"}</h1>
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

          <div className="w-full mx-auto">
            <Button variant="contained" className="!w-full" type="submit">
              {editable ? "Edit Job" : "Add Job"}
            </Button>
            {editable && (
              <Button onClick={cancelEdit} color="error" variant="contained">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddJob;
