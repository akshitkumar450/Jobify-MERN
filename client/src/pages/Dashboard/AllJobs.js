import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../../components/JobCard";
import { allJobsAction } from "../../redux/actions/jobActions";
import { jobService } from "../../services/jobService";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";

function AllJobs() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);

  const [page, setPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const jobs = await jobService.getJobs(page);
        // console.log("Jobs", jobs?.data);
        if (jobs.data.jobs.length === 0) {
          setPage(page - 1);
        }
        setTotalJobs(jobs?.data.totalJobs.length);
        // if (jobs?.data.jobs.length > 0) {
        dispatch(allJobsAction(jobs?.data.jobs));
        // }
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };
    getAllJobs();
  }, [dispatch, page, totalJobs, toggle]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="max-w-5xl mx-auto p-20">
      <h3>{totalJobs} Jobs Found</h3>
      <div className="grid grid-cols-2 gap-10">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} handleToggle={handleToggle} />
        ))}
      </div>

      <div className="flex justify-center mt-5">
        <Pagination
          count={Math.ceil(totalJobs / 2)}
          page={page}
          onChange={(event, value) => {
            setPage(value);
          }}
        />
      </div>
    </div>
  );
}

export default AllJobs;
