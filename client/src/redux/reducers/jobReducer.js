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

    case "SET_JOB_ID":
      return {
        ...state,
        jobId: action.payload,
        editable: true,
      };

    case "CANCEL_EDIT":
      return {
        ...state,
        editable: false,
        jobId: "",
      };

    case "EDIT_JOB":
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job._id === action.payload.id
            ? { ...job, ...action.payload.data }
            : job
        ),
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
