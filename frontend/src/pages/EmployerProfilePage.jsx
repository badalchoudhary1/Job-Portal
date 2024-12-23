


import { createSignal, createEffect } from "solid-js";
import { useParams } from "@solidjs/router"; // Get the dynamic ID from the URL
import { fetchEmployerProfile } from "../api/employerProfile"; // API to fetch profile

const EmployerProfilePage = () => {
  const { id } = useParams(); // Get the dynamic ID from the URL
  const [profile, setProfile] = createSignal(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(null);

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
  createEffect(() => {
    if (id) {
      getEmployerProfile();
    }
  });

  return (
    <div class="p-6">
      {loading() && <div class="text-center text-gray-500">Loading...</div>}
      {error() && <div class="text-red-500 text-center">{error()}</div>}
      {profile() && (
        <div class="max-w-3xl mx-auto p-6 border rounded shadow">
          <h1 class="text-4xl font-bold mb-4">{profile().company_name}</h1>
          <p class="mb-4">
            <strong>Company Description:</strong> {profile().description}
          </p>
          <p class="mb-4">
            <strong>Website:</strong>{" "}
            <a
              href={profile().website}
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-500 hover:underline"
            >
              {profile().website}
            </a>
          </p>
          <p>
            <strong>Location:</strong> {profile().location}
          </p>
        </div>
      )}
    </div>
  );
};

export default EmployerProfilePage;
