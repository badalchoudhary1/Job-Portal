import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchspecificEmployerProfile } from "../../api/employerApi";

const EmployerProfile = () => {
  const { id } = useParams(); // Get employer ID from URL
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchspecificEmployerProfile(id);
        setProfile(data);
      } catch (err) {
        console.error("Error loading profile:", err);
        setError(err.message || "Failed to load profile");
      }
    };

    if (id) {
      loadProfile();
    }
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Employer Profile
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {profile ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-semibold text-gray-700">
                {profile.company_name}
              </h3>
              <p className="text-gray-500">{profile.location || "Location: N/A"}</p>
            </div>

            <div className="border-t pt-4">
              <p className="text-gray-700">
                <strong>Email:</strong> <span className="text-gray-600">{profile.email}</span>
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> <span className="text-gray-600">{profile.phone}</span>
              </p>
            </div>

            <div className="border-t pt-4 flex flex-col items-center">
              {profile.website ? (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-700 transition"
                >
                  Visit Website
                </a>
              ) : (
                <p className="text-gray-500">No Website Available</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default EmployerProfile;
