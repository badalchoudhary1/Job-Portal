import { Link , useParams} from "react-router-dom"; 
import { useEffect, useState } from "react";

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  const fetchJobDetails = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/jobs/${id}/`);
    const data = await response.json();
    setJob(data);
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {job ? (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h2>
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold">Company:</span> {job.company_name}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold">Location:</span> {job.location}
          </p>
          <p className="text-lg text-green-600 font-semibold mb-4">
            Salary: {job.salary}
          </p>
          <p className="text-gray-800 mb-4">{job.description}</p>
          <p className="text-gray-500">
            <span className="font-semibold">Posted on:</span> {job.posted_at}
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Back to Listings
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default JobDetailPage;
