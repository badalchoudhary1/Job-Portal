

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/api/';  // Make sure this matches your Django API

// Register function
export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}register/`, {
      username,
      email,
      password,
    });
    const { token } = response.data;
    localStorage.setItem('token', token);  // Store token in local storage after registration
    return response;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error;
  }
};

// Login function (unchanged)
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}login/`, { username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// Get Profile function (unchanged)
export const getProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("No token found, please login.");

  try {
    const response = await axios.get(`${API_URL}profile/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error.response?.data || error.message);
    throw error;
  }
};

// Logout function (unchanged)
export const logout = () => {
  localStorage.removeItem('token');
};
