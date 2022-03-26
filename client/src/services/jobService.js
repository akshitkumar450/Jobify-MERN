import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/job";

export const jobService = {
  addJob: async (data) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const result = await axios.post(API_URL, data, config);
    return {
      data: result.data,
    };
  },

  getJobs: async () => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const result = await axios.get(API_URL, config);
    return {
      data: result.data,
    };
  },
};
