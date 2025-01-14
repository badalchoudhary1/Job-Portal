import { fetchAllEmployerProfiles } from "../api/employerProfile"; // API function for fetching all profiles
import { useEffect, useState } from "react";

const EmployerProfilesPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all employer profiles on component mount
  const getAllProfiles = async () => {
    try {
      setLoading(true);
      const response = await fetchAllEmployerProfiles();
      setProfiles(response);
    } catch (err) {
      setError("Failed to fetch profiles");
    } finally {
      setLoading(false);
    }
  };

  // Call the API on component mount
  useEffect(() => {
    getAllProfiles();
  },[]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Employer Profiles</h1>
      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!loading && profiles.length === 0 && (
        <div className="text-center text-gray-500">No profiles found.</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="p-4 border rounded shadow hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{profile.company_name}</h2>
            <p className="text-gray-600 mb-4">
              <strong>Location:</strong> {profile.location}
            </p>
            <a
              href={`/profile/employer/${profile.id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerProfilesPage;

