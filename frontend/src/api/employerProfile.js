const API_URL = "http://localhost:8000/api/api/employer-profile/";

// Fetch a single employer profile by ID
export const fetchEmployerProfile = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/`);
    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Fetch all employer profiles
export const fetchAllEmployerProfiles = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch profiles");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
