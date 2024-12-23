import { createSignal, createEffect } from "solid-js";
import { useParams } from "@solidjs/router";

const JobSeekerDetails = () => {
  const params = useParams();
  const [jobSeeker, setJobSeeker] = createSignal(null);

  createEffect(() => {
    fetch(`http://127.0.0.1:8000/api/job-seekers/${params.id}/`)
      .then((response) => response.json())
      .then((data) => setJobSeeker(data));
  });

  return (
    <div class="p-6 max-w-lg mx-auto border rounded shadow-sm">
      {jobSeeker() && (
        <>
          <img
            src={jobSeeker().profile_picture || "/placeholder.jpg"}
            alt={jobSeeker().name}
            class="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h1 class="text-2xl font-bold">{jobSeeker().name}</h1>
          <p class="text-gray-600">{jobSeeker().bio}</p>
          <p class="mt-2">
            <strong>Location:</strong> {jobSeeker().location}
          </p>
          <p>
            <strong>Email:</strong> {jobSeeker().email}
          </p>
          <p>
            <strong>Skills:</strong> {jobSeeker().skills}
          </p>
        </>
      )}
    </div>
  );
};

export default JobSeekerDetails;
