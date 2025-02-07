import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/api/employer/";


export const fetchAllEmployers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const fetchspecificEmployerProfile = async (id, token) => {
  if (!id) {
    console.error("Employer ID is missing!");
    return null;
  }

  try {
    const response = await axios.get(`${BASE_URL}${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


export const createEmployerProfile = async (token, data) => {
  try {
    const response = await axios.post(`${BASE_URL}create-emp-profile/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};




