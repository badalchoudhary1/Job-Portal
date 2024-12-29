import JobCard from "../JobCard/JobCard.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ViewJobPostPage = () => {
  const [jobs, setJobs] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Fetch jobs data from the API
  const fetchJobs = async (url = "http://127.0.0.1:8000/api/jobs/") => {
    setLoading(true);
  
    // Correctly construct the query string for title and company name
    const searchQuery = searchParams.title ? `title=${searchParams.title}` : "";
    const companyName = searchParams.company_name ? `company_name=${searchParams.company_name}` : "";
    
    // Combine the search parameters
    const queryString = [searchQuery, companyName].filter(Boolean).join("&");
    
    // Construct the final URL
    const apiUrl = queryString ? `${url}?${queryString}` : url;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data && Array.isArray(data.results)) {
        setJobs(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      } else {
        setJobs([]); // In case no results are returned
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]); // Reset jobs in case of error
    } finally {
      setLoading(false);
    }
  };
  
  // Refetch jobs when search params change
  useEffect(() => {
    fetchJobs();
  }, []);

  const handleNextPage = () => {
    if (nextPage) {
      fetchJobs(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      fetchJobs(previousPage);
    }
  };

  const handleBackToJobList = () => {
    navigate("/"); // Return to job list page
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Job Listings</h1>
      <div className="mb-4 text-center">
        <button
          onClick={handleBackToJobList}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back to Job List
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No jobs found</p>
      )}

      <div className="text-center mt-6 space-x-4">
        {previousPage && (
          <button
            onClick={handlePreviousPage}
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Previous Page
          </button>
        )}
        {nextPage && (
          <button
            onClick={handleNextPage}
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewJobPostPage;
