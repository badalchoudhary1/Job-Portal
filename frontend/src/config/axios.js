import axios from "axios";
import useStore from "../store";

// Set base URL for all requests
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

// Add a request interceptor to attach the token
axios.interceptors.request.use(function (config) {
    // Get token from localStorage or any secure storage
    const token = useStore.getState().token;

    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // Handle token expiration or errors globally
    if (error.response && error.response.status === 401) {
        console.log('Unauthorized! Redirecting to login...');
        // Perform logout or redirect to login
    }
    return Promise.reject(error);
});