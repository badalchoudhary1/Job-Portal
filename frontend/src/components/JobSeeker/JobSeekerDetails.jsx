import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const JobSeekerDetails = () => {
  const params = useParams();
  const [jobSeeker, setJobSeeker] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/job-seekers/${params.id}/`)
      .then((response) => response.json())
      .then((data) => setJobSeeker(data));
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto border rounded shadow-sm">
      {jobSeeker && (
        <>
          <img
            src={jobSeeker.profile_picture || "/placeholder.jpg"}
            alt={jobSeeker.name}
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold">{jobSeeker.name}</h1>
          <p className="text-gray-600">{jobSeeker.bio}</p>
          <p className="mt-2">
            <strong>Location:</strong> {jobSeeker.location}
          </p>
          <p>
            <strong>Email:</strong> {jobSeeker.email}
          </p>
          <p>
            <strong>Skills:</strong> {jobSeeker.skills}
          </p>
        </>
      )}
    </div>
  );
};

export default JobSeekerDetails;
