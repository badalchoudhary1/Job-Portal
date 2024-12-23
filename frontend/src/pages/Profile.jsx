
import { createSignal, onMount } from "solid-js";
import { getProfile, logout } from "../services/auth";

const Profile = () => {
  const [profile, setProfile] = createSignal(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal("");

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
      window.location.href = '/';  // Redirect to login page
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    alert("Logged out successfully");
    window.location.href = '/';  // Redirect to login page
  };

  // Fetch profile when component mounts
  onMount(() => {
    fetchProfile();
  });

  

  return (
    <div>
      <h2>Profile</h2>
      
      {loading() && <p>Loading...</p>}

      {!loading() && profile()?.message ? (
        <div>
          <p>{profile().message}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        !loading() && <p>{error() || "Could not fetch detailed profile. Please try again later."}</p>
      )}
    </div>
  );
};

export default Profile;

