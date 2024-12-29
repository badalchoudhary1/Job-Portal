import { Link } from "react-router-dom";

const JobCard = (props) => {
  const { job } = props;
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-4 bg-white">
      <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
      <p className="text-gray-600">{job.company_name}</p>
      <p className="text-gray-500">{job.location}</p>
      <p className="text-green-600 font-semibold">{job.salary}</p>
      <div className="mt-4">
        <Link
          to={`/job/${job.id}`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
