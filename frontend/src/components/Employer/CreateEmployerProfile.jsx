import { useState } from "react";
import { createEmployerProfile } from "../../api/employerApi";

const CreateEmployerProfile = ({ token }) => {
  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    phone: "",
    location: "",
    website: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await createEmployerProfile(token, formData);
      setMessage("Profile created successfully!");
      setFormData({
        company_name: "",
        email: "",
        phone: "",
        location: "",
        website: "",
      });
    } catch (err) {
      setError(err.error || "Failed to create profile");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold text-gray-700">Create Employer Profile</h2>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-4">
        <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Company Name" className="w-full p-2 border rounded-md mb-2" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded-md mb-2" required />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded-md mb-2" required />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location (Optional)" className="w-full p-2 border rounded-md mb-2" />
        <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="Website (Optional)" className="w-full p-2 border rounded-md mb-2" />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateEmployerProfile;
