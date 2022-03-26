import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../../components/JobCard";
import { allJobsAction } from "../../redux/actions/jobActions";
import { jobService } from "../../services/jobService";
import { toast } from "react-toastify";
function AllJobs() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllJobs = async () => {
      setLoading(true);
      try {
        const jobs = await jobService.getJobs();
        // console.log(jobs?.data.jobs);
        if (jobs?.data.jobs.length > 0) {
          dispatch(allJobsAction(jobs?.data.jobs));
          toast.success("fetched");
        }
        setLoading(false);
      } catch (err) {
        toast.error(err.response.data.message);
        setLoading(false);
      }
      setLoading(false);
    };
    getAllJobs();
  }, [dispatch]);

  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="max-w-5xl mx-auto p-20">
      {jobs.length === 0 ? (
        <h3 className="text-center">No Jobs Found</h3>
      ) : (
        <>
          <h3>{jobs.length} Jobs Found</h3>
          <div className="grid grid-cols-2 gap-10">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AllJobs;
