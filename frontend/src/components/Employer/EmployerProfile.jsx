import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get ID from the URL
import { fetchspecificEmployerProfile } from "../../api/employerApi";

const EmployerProfile = () => {
  const { id } = useParams(); // Extract ID from URL
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchspecificEmployerProfile(id);  // Pass the employer ID and token separately
        setProfile(data);  // Set profile data
      } catch (err) {
        console.error("Error loading profile:", err);  // Log for debugging
        setError(err.message || "Failed to load profile");
      }
    };

    if (id) {
      loadProfile(); // Load profile when ID and token are available
    }
  }, [id]);  // Dependency on ID and token

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700">Employer Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      {profile ? (
        <div className="mt-4">
          <p><strong>Company:</strong> {profile.company_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Location:</strong> {profile.location || "N/A"}</p>
          <p><strong>Website:</strong> <a href={profile.website} target="_blank" rel="noreferrer" className="text-blue-500">{profile.website || "N/A"}</a></p>
        </div>
      ) : (
        <p className="text-gray-500">Loading profile...</p>
      )}
    </div>
  );
};

export default EmployerProfile;
