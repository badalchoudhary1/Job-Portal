import React, { useEffect, useState } from "react";
import { fetchJobSeekers } from "../../api/jobSeekerApi";

const JobSeekerList = () => {
  const [jobSeekers, setJobSeekers] = useState([]);

  useEffect(() => {
    const loadJobSeekers = async () => {
      try {
        const data = await fetchJobSeekers();
        setJobSeekers(data);
      } catch (error) {
        console.error("Error fetching job seekers:", error);
      }
    };
    loadJobSeekers();
  }, []);

  return (
    <div>
      <h2>Job Seekers</h2>
      <ul>
        {jobSeekers.map((seeker) => (
          <li key={seeker.id}>
            {seeker.name} - {seeker.email} - {seeker.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobSeekerList;
