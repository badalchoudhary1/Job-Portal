import { getProfile } from "../services/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";  // Assuming you have a store for user state

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useStore();  // Fetch user data
  const navigate = useNavigate();

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      console.log("Fetched Profile:", data);
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Session expired. Please login again.");
    } finally {
      setLoading(false);
    }
  };

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
          </div>
        ) : (
          !loading && <p className="text-center text-red-500">{error || "Could not fetch detailed profile. Please try again later."}</p>
        )}

        {/* Conditional Profile Creation Button */}
        {!loading && !profile?.hasProfile && (  // Check if user has no profile yet
          <div className="mt-6 text-center">
            {user?.role === "job_seeker" && (
              <button 
                onClick={() => navigate("/job-seekers/new")}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                Create Your Job Seeker Profile
              </button>
            )}
            {user?.role === "employer" && (
              <button 
                onClick={() => navigate("/create-emp")}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
                Create Your Employer Profile
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
