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

export const setJobIdAction = (id) => {
  return {
    type: "SET_JOB_ID",
    payload: id,
  };
};

export const cancelEditAction = () => {
  return {
    type: "CANCEL_EDIT",
  };
};

export const editJobAction = (id, data) => {
  return {
    type: "EDIT_JOB",
    payload: { id, data },
  };
};

export const deteleJobAction = (id) => {
  return {
    type: "DELETE_JOB",
    payload: id,
  };
};
