import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/api/jobseeker/";

export const fetchJobSeekers = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const fetchJobSeekerDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}${id}/`);
  return response.data;
};

export const createJobSeekerProfile = async (data) => {
  const response = await axios.post(`${BASE_URL}create-profile/`, data);
  return response.data;
};

