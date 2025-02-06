import { useEffect, useState } from "react";
import { fetchAllEmployers } from "../../api/employerApi";

const EmployerList = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Employer Profiles</h2>
      {employers.length === 0 ? (
        <p>No employers found.</p>
      ) : (
        <ul>
          {employers.map((employer) => (
            <li key={employer.id} className="border-b py-2">
              <p className="font-bold">{employer.company_name}</p>
              <p>Email: {employer.email}</p>
              <p>Phone: {employer.phone}</p>
              <p>Location: {employer.location || "N/A"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployerList;
