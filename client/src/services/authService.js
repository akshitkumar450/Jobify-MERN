import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/auth";

export const authService = {
  register: async (data) => {
    const { name, email, password } = data;
    const result = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
    });
    if (result?.data) {
      return {
        data: result.data,
      };
    }
  },

  login: async (data) => {
    const { email, password } = data;
    const result = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    if (result?.data) {
      return {
        data: result.data,
      };
    }
  },

  updateUser: async (data) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const result = await axios.patch(`${API_URL}/updateUser`, data, config);
    return {
      data: result.data,
    };
  },
};
