

import { createSignal, onMount } from "solid-js";
import { Navigate } from "@solidjs/router";
import axios from "axios";

const ProtectedRoute = (props) => {
  const [authenticated, setAuthenticated] = createSignal(false);
  const [loading, setLoading] = createSignal(true);

  // Check authentication on mount
  const checkAuthentication = async () => {
    console.log("Checking authentication...");

    const token = localStorage.getItem("token");
    console.log("Token found:", token);

    if (!token) {
      console.log("No token found, redirecting to login.");
      setAuthenticated(false);
      setLoading(false);  // Stop loading immediately when no token
      return;
    }

    try {
      console.log("Validating token...");
      const response = await axios.get("http://127.0.0.1:8000/api/api/profile/", {
        headers: { Authorization: `Token ${token}` },
      });
      console.log("API response:", response);

      if (response.status === 200) {
        console.log("Token is valid. User authenticated.");
        setAuthenticated(true);  // Set authenticated to true if the token is valid
      } else {
        console.log("Invalid token response.");
        setAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth error:", error);
      setAuthenticated(false);
    } finally {
      console.log("Finished checking authentication.");
      setLoading(false); // Stop loading after completing the check
    }
  };

  // Call checkAuthentication once when the component is mounted
  onMount(() => {
    console.log("on mount sttarted")
    checkAuthentication();
  });

  // Check loading and authenticated signals in the render cycle
  console.log("Loading state:", loading());
  console.log("Authenticated state:", authenticated());

  // Redirect if not authenticated and loading is finished
  if (!authenticated() && !loading()) {
    console.log("User not authenticated, redirecting to login.");
    return <Navigate href="/login" />;
  }

  // Show loading while checking authentication
  if (loading()) {
    console.log("Loading... Please wait.");
    return <div>Loading...</div>;
  }

  // Render protected content after authentication check
  console.log("Rendering protected content.");
  return <>{props.children}</>;  // Render the protected content
};

export default ProtectedRoute;

