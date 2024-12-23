import { A } from "@solidjs/router";

const JobCard = (props) => {
  const { job } = props;
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg p-4 m-4 bg-white">
      <h2 class="text-xl font-semibold text-gray-800">{job.title}</h2>
      <p class="text-gray-600">{job.company_name}</p>
      <p class="text-gray-500">{job.location}</p>
      <p class="text-green-600 font-semibold">{job.salary}</p>
      <div class="mt-4">
        <A
          href={`/job/${job.id}`}
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View Details
        </A>
      </div>
    </div>
  );
};

export default JobCard;
