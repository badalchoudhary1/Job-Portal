
import { useParams } from "react-router-dom";
import { fetchEmployerProfile } from "../api/employerProfile"; // API to fetch profile
import { useEffect, useState } from "react";

const EmployerProfilePage = () => {
  const { id } = useParams(); // Get the dynamic ID from the URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employer profile data when the component mounts
  const getEmployerProfile = async () => {
    try {
      setLoading(true);
      const response = await fetchEmployerProfile(id);
      setProfile(response);
    } catch (err) {
      setError("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  // Call the API on component mount
  useEffect(() => {
    if (id) {
      getEmployerProfile();
    }
  }, []);

  return (
    <div className="p-6">
      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {profile && (
        <div className="max-w-3xl mx-auto p-6 border rounded shadow">
          <h1 className="text-4xl font-bold mb-4">{profile.company_name}</h1>
          <p className="mb-4">
            <strong>Company Description:</strong> {profile.description}
          </p>
          <p className="mb-4">
            <strong>Website:</strong>{" "}
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {profile.website}
            </a>
          </p>
          <p>
            <strong>Location:</strong> {profile.location}
          </p>
        </div>
      )}
    </div>
  );
};

export default EmployerProfilePage;
