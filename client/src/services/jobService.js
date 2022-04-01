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

  getJobs: async (page, sort, search, status, type) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    let url = `${API_URL}?status=${status}&jobType=${type}&sort=${sort}&page=${page}&limit=2`;
    if (search) {
      url = url + `&search=${search}`;
    }
    const result = await axios.get(url, config);
    return {
      data: result.data,
    };
  },

  getByJobId: async (id) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const result = await axios.get(`${API_URL}/${id}`, config);
    return {
      data: result.data,
    };
  },

  updateJob: async (id, data) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const result = await axios.patch(`${API_URL}/${id}`, data, config);
    return {
      data: result.data,
    };
  },

  deleteJob: async (id) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const result = await axios.delete(`${API_URL}/${id}`, config);
    return {
      data: result.data,
    };
  },
};
