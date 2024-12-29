import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const JobSeekerList = () => {
  const [jobSeekers, setJobSeekers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/job-seekers/")
      .then((response) => response.json())
      .then((data) => setJobSeekers(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Seeker Profiles</h1>
      <Link
        to="/job-seekers/new"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add New Job Seeker
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {jobSeekers.map((jobSeeker) => (
          <div className="p-4 border rounded shadow-sm">
            <img
              src={jobSeeker.profile_picture || "/placeholder.jpg"}
              alt={jobSeeker.name}
              className="w-20 h-20 rounded-full mb-2"
            />
            <h2 className="font-bold">{jobSeeker.name}</h2>
            <p>{jobSeeker.location}</p>
            <Link
              to={`/job-seekers/${jobSeeker.id}`}
              className="text-blue-500 hover:underline"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSeekerList;
