export const addJobAction = (job) => {
  return {
    type: "ADD_JOB",
    payload: job,
  };
};

export const allJobsAction = (jobs) => {
  return {
    type: "ALL_JOBS",
    payload: jobs,
  };
};

export const clearJobsAction = () => {
  return {
    type: "CLEAR_JOBS",
  };
};
