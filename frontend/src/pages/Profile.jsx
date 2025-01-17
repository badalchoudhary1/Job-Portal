


import { getProfile, logout } from "../services/auth";
import { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      console.log("Fetched Profile:", data);
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Session expired. Please login again.");
      logout();  // Clear token if fetch fails
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    alert("Logged out successfully");
  };

  // Fetch profile when component mounts
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Profile</h2>
        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {!loading && profile?.message ? (
          <div className="text-center">
            <p className="text-lg mb-4">{profile.message}</p>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
              Logout
            </button>
          </div>
        ) : (
          !loading && <p className="text-center text-red-500">{error || "Could not fetch detailed profile. Please try again later."}</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
