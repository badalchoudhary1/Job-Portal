

import axios from 'axios';
import useStore from '../store';

// Register function
export const register = async (username, email, password, role) => {
  try {
    const response = await axios.post(`/api/register/`, {
      username,
      email,
      password,
      role,
    });
    
    return response;

  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error;
  }
};

// Login function (unchanged)
export const login = async (username, password) => {
  try {
    const response = await axios.post(`/api/login/`, { username, password });
    const { token , user} = response.data;
     useStore.getState().setToken(token);
     useStore.getState().setUser(user);
    return response;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// Login function to send credentials to the backend


// Get Profile function (unchanged)
export const getProfile = async () => {
  const token = useStore.getState().token;
  if (!token) throw new Error("No token found, please login.");

  try {
    const response = await axios.get(`/api/profile/`, {
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
  useStore.getState().setToken(null);
  useStore.getState().setUser(null);
};
  