import React from "react";
import { createJobSeekerProfile } from "../../api/jobSeekerApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits and only number."),
  skills: z.string().min(1, "Skills are required."),
  bio: z.string().optional(),
  location: z.string().min(1, "Location is required."),
  
});

const JobSeekerForm = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Get the reset function to clear the form
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    
    // Add text fields
    for (const key in data) {
      if (key !== "profile_picture" && key !== "resume") {
        formData.append(key, data[key]);
      }
    }
  
    // Add file inputs explicitly
    const profilePictureFile = document.querySelector('input[name="profile_picture"]').files[0];
    if (profilePictureFile) {
      formData.append("profile_picture", profilePictureFile);
    }
  
    const resumeFile = document.querySelector('input[name="resume"]').files[0];
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }
  
    try {
      const response = await createJobSeekerProfile(formData); // Replace with your API call
      toast.success("Profile created successfully!");
      console.log("API Response:", response);
  
      // Reset form fields after successful submission
      reset();
  
      // Redirect to /your  page
      navigate(`/job-seekers/${response.id}`); 
    } catch (error) {
      console.error("Error creating profile:", error.response?.data || error.message);
      toast.error(error.response.data.message)
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-12 mb-12">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Job Seeker Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            {...register("name")}
            placeholder="Name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        
        <div>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="text"
            {...register("phone")}
            placeholder="Phone"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div>
        <label htmlFor="resume" className="block text-gray-400 font-medium mb-2">
          Upload your Resume </label>
          <input
            type="file"
            {...register("resume")}
            accept=".pdf, .doc, .docx" // Restrict to document types
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.resume && <p className="text-red-500 text-sm">{errors.resume.message}</p>}
        </div>

        <div>
        <label htmlFor="resume" className="block text-gray-400 font-medium mb-2">
        Upload your Profile Picture </label>
          <input
            type="file"
            accept="image/*" // Restrict to image types
            {...register("profile_picture")}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.profile_picture && <p className="text-red-500 text-sm">{errors.profile_picture.message}</p>}
        </div>

        <div>
          <textarea
            {...register("skills")}
            placeholder="Skills"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
        </div>

        <div>
          <textarea
            {...register("bio")}
            placeholder="Bio"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <div>
          <input
            type="text"
            {...register("location")}
            placeholder="Location"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default JobSeekerForm;
