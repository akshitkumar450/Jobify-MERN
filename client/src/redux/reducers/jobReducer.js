const initialState = {
  job: null,
  editable: false,
  jobId: "",
  jobs: [],
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_JOB":
      return {
        ...state,
        job: action.payload,
      };

    case "ALL_JOBS":
      return {
        ...state,
        jobs: action.payload,
      };

    case "CLEAR_JOBS":
      return {
        job: null,
        editable: false,
        jobId: "",
        jobs: [],
      };

    default:
      return state;
  }
};
export default jobReducer;
