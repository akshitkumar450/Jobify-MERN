import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/job/";

export const statsService = {
  getStats: async () => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const result = await axios.get(`${API_URL}/stats`, config);
    return {
      data: result.data,
    };
  },
};
