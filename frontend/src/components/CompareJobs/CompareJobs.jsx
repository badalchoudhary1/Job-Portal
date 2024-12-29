
const CompareJobs = ({ jobs }) => {
  // if (!jobs || jobs.length < 2) {
  //   return (
  //     <div className="text-center mt-8 text-gray-600">
  //       <p>Please select at least two jobs to compare.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-screen-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Compare Jobs
        </h1>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Feature</th>
                {jobs.map((job, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    {job.title} <br />
                    <span className="text-sm text-gray-500">{job.company}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Job Location */}
              <tr>
                <td className="border border-gray-300 px-4 py-2">Location</td>
                {jobs.map((job, index) => (
                  <td key={index} className="border border-gray-300 px-4 py-2 text-center">
                    {job.location}
                  </td>
                ))}
              </tr>

              {/* Job Type */}
              <tr>
                <td className="border border-gray-300 px-4 py-2">Type</td>
                {jobs.map((job, index) => (
                  <td key={index} className="border border-gray-300 px-4 py-2 text-center">
                    {job.type}
                  </td>
                ))}
              </tr>

              {/* Job Salary */}
              <tr>
                <td className="border border-gray-300 px-4 py-2">Salary</td>
                {jobs.map((job, index) => (
                  <td key={index} className="border border-gray-300 px-4 py-2 text-center">
                    {job.salary || "Not Provided"}
                  </td>
                ))}
              </tr>

              {/* Posted Date */}
              <tr>
                <td className="border border-gray-300 px-4 py-2">Posted Date</td>
                {jobs.map((job, index) => (
                  <td key={index} className="border border-gray-300 px-4 py-2 text-center">
                    {job.postedDate}
                  </td>
                ))}
              </tr>

              {/* Application Link */}
              <tr>
                <td className="border border-gray-300 px-4 py-2">Apply</td>
                {jobs.map((job, index) => (
                  <td key={index} className="border border-gray-300 px-4 py-2 text-center">
                    <a
                      href={job.applicationLink || "#"}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply Now
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompareJobs;
