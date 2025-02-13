import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createEmployerProfile } from "../../api/employerApi";
import { useNavigate } from "react-router-dom";  // Import this
import { toast } from "react-toastify";

// Zod schema for form validation
const schema = z.object({
  company_name: z.string().min(1, "Company name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().regex(/^\d{10,15}$/, "Phone number should be between 10 and 15 digits."),
  location: z.string().optional(),
  website: z.string().url("Please enter a valid URL."),
});

const CreateEmployerProfile = ({ token }) => {
  const navigate = useNavigate();  // Initialize navigate
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,  // Hookform reset method to clear the form fields
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const profileData =  await createEmployerProfile(token, data); // Remove response
      reset();  // Clear the form fields
      toast.success("Profile created successfully!");
      navigate(`/emp-profile/${profileData.id}`);  // Redirect to /employers
    } catch (error) {
      // alert("Failed to create profile. Please try again.");
     toast.error(error.response.data.message)
    }
  };


  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold text-gray-700">Create Employer Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        {/* Company Name */}
        <div>
          <input
            type="text"
            {...register("company_name")}
            placeholder="Company Name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.company_name && (
            <p className="text-red-500 text-sm">{errors.company_name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <input
            type="text"
            {...register("phone")}
            placeholder="Phone"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Location */}
        <div>
          <input
            type="text"
            {...register("location")}
            placeholder="Location (Optional)"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Website */}
        <div>
          <input
            type="url"
            {...register("website")}
            placeholder="Website"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}
        </div>

        {/* Submit Button */}
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

export default CreateEmployerProfile;
