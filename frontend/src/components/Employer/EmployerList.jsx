import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { fetchAllEmployers } from "../../api/employerApi";

const EmployerList = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employersPerPage = 6; // Number of employers to show per page

  useEffect(() => {
    const loadEmployers = async () => {
      try {
        const data = await fetchAllEmployers();
        setEmployers(data);
      } catch (err) {
        setError("Failed to load employers");
      } finally {
        setLoading(false);
      }
    };

    loadEmployers();
  }, []);

  // Pagination logic
  const indexOfLastEmployer = currentPage * employersPerPage;
  const indexOfFirstEmployer = indexOfLastEmployer - employersPerPage;
  const currentEmployers = employers.slice(indexOfFirstEmployer, indexOfLastEmployer);
  const totalPages = Math.ceil(employers.length / employersPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Employer Profiles</h2>

      {currentEmployers.length === 0 ? (
        <p className="text-center text-gray-500">No employers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentEmployers.map((employer) => (
            <div
              key={employer.id}
              className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                <Link
                  to={`/emp-profile/${employer.id}`} // Navigate to employer profile
                  className="text-blue-600 hover:underline"
                >
                  {employer.company_name}
                </Link>
              </h3>
              <p className="text-gray-600 mt-2">
                <strong>Email:</strong> {employer.email}
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> {employer.phone}
              </p>
              <p className="text-gray-600">
                <strong>Location:</strong> {employer.location || "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>Website:</strong>{" "}
                {employer.website ? (
                  <a
                    href={employer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {employer.website}
                  </a>
                ) : (
                  "Not Available"
                )}
              </p>
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

export default EmployerList;
