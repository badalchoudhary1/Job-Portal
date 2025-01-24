import React, { useState } from "react";
import { createJobSeekerProfile } from "../../api/jobSeekerApi";

const JobSeekerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    profile_picture: null,
    skills: "",
    bio: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    try {
      const response = await createJobSeekerProfile(form);
      alert("Profile created successfully!");
      console.log(response);
    } catch (error) {
      console.error("Error creating profile:", error.response?.data || error.message);
      alert("Failed to create profile. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
      <input type="file" name="resume" onChange={handleFileChange} />
      <input type="file" name="profile_picture" onChange={handleFileChange} />
      <textarea name="skills" placeholder="Skills" onChange={handleChange}></textarea>
      <textarea name="bio" placeholder="Bio" onChange={handleChange}></textarea>
      <input type="text" name="location" placeholder="Location" onChange={handleChange} />
      <button type="submit">Create Profile</button>
    </form>
  );
};

export default JobSeekerForm;
