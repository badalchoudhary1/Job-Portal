import { createSignal, createEffect } from "solid-js";
import { A } from "@solidjs/router";

const JobSeekerList = () => {
  const [jobSeekers, setJobSeekers] = createSignal([]);

  createEffect(() => {
    fetch("http://127.0.0.1:8000/api/job-seekers/")
      .then((response) => response.json())
      .then((data) => setJobSeekers(data));
  });

  return (
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Job Seeker Profiles</h1>
      <A
        href="/job-seekers/new"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add New Job Seeker
      </A>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {jobSeekers().map((jobSeeker) => (
          <div class="p-4 border rounded shadow-sm">
            <img
              src={jobSeeker.profile_picture || "/placeholder.jpg"}
              alt={jobSeeker.name}
              class="w-20 h-20 rounded-full mb-2"
            />
            <h2 class="font-bold">{jobSeeker.name}</h2>
            <p>{jobSeeker.location}</p>
            <A
              href={`/job-seekers/${jobSeeker.id}`}
              class="text-blue-500 hover:underline"
            >
              View Profile
            </A>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSeekerList;
