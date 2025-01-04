import axios from "axios";
import queryString from "query-string"

export const fetchJobsAction = async (searchParams = {}) => {
    const query = queryString.stringify(searchParams, { skipEmptyString: true, skipNull: true });
  
    try {
      // Use the full API URL
      const response = await axios.get(`/jobs/?${query}`);
      return response.data;
      
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    } 
};

export const applyJobAction = async (body = {}) => {

  try {
    // Use the full API URL
    const response = await axios.post(``, body);
    return response.data;
    
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  } 
};