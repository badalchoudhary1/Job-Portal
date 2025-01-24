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

  if (!jobSeeker) return <p>Loading...</p>;

  return (
    <div>
      <h2>{jobSeeker.name}</h2>
      <p>Email: {jobSeeker.email}</p>
      <p>Phone: {jobSeeker.phone}</p>
      <p>Location: {jobSeeker.location}</p>
      <p>Bio: {jobSeeker.bio}</p>
      <p>Skills: {jobSeeker.skills}</p>
    </div>
  );
};

export default JobSeekerDetails;
