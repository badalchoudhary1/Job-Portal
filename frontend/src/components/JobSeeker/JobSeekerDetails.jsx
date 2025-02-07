import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobSeekerDetails } from "../../api/jobSeekerApi";

const JobSeekerDetails = () => {
  const { id } = useParams();
  const [jobSeeker, setJobSeeker] = useState(null);

  useEffect(() => {
    const loadJobSeekerDetails = async () => {
      try {
        const data = await fetchJobSeekerDetails(id);
        setJobSeeker(data);
      } catch (error) {
        console.error("Error fetching job seeker details:", error);
      }
    };
    loadJobSeekerDetails();
  }, [id]);

  if (!jobSeeker) return <p className="text-center text-xl font-semibold">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-12 mb-12">
      <div className="flex flex-col items-center">
        {jobSeeker.profile_picture && (
          <img
            src={jobSeeker.profile_picture}
            alt={`${jobSeeker.name}'s profile`}
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
        )}
        <h2 className="text-3xl font-semibold text-center mb-4">{jobSeeker.name}</h2>
        <p className="text-lg text-gray-700 mb-2"><strong>Email:</strong> {jobSeeker.email}</p>
        <p className="text-lg text-gray-700 mb-2"><strong>Phone:</strong> {jobSeeker.phone}</p>
        <p className="text-lg text-gray-700 mb-2"><strong>Location:</strong> {jobSeeker.location}</p>
        <p className="text-lg text-gray-700 mb-2"><strong>Bio:</strong> {jobSeeker.bio || "N/A"}</p>
        <p className="text-lg text-gray-700 mb-2"><strong>Skills:</strong> {jobSeeker.skills}</p>

        {/* Resume download or view option */}
        {jobSeeker.resume && (
          <div className="mt-4">
            <a
              href={jobSeeker.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View or Download Resume
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSeekerDetails;


