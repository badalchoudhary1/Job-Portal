import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchJobSeekers } from "../../api/jobSeekerApi";

const JobSeekerList = () => {
  const [jobSeekers, setJobSeekers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");        
  const [currentPage, setCurrentPage] = useState(1); 
  const seekersPerPage = 6; 

  useEffect(() => {
    const loadJobSeekers = async () => {
      try {
        const data = await fetchJobSeekers();
        setJobSeekers(data); 
      } catch (error) {
        setError("Error fetching job seekers");
        console.error("Error fetching job seekers:", error);
      } finally {
        setLoading(false); 
      }
    };
    loadJobSeekers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Pagination logic
  const indexOfLastSeeker = currentPage * seekersPerPage;
  const indexOfFirstSeeker = indexOfLastSeeker - seekersPerPage;
  const currentSeekers = jobSeekers.slice(indexOfFirstSeeker, indexOfLastSeeker);
  const totalPages = Math.ceil(jobSeekers.length / seekersPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Job Seekers</h2>

      {currentSeekers.length === 0 ? (
        <p className="text-center text-gray-500">No job seekers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentSeekers.map((seeker) => (
            <div
              key={seeker.id}
              className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex items-center mb-4">
                {/* Profile Picture */}
                <img
                  src={seeker.profile_picture || "/default-profile.png"} 
                  alt={seeker.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                {console.log("Job Seeker:", seeker)}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    <Link
                      to={`/job-seekers/${seeker.id}`} 
                      className="text-blue-600 hover:underline"
                    >
                      {seeker.name}
                    </Link>
                  </h3>
                  <p className="text-gray-600">{seeker.email}</p>
                  <p className="text-gray-600">{seeker.location || "Location not available"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700 px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobSeekerList;
