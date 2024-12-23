import { useParams } from "@solidjs/router";
import { createSignal, createEffect } from "solid-js";
import {A} from "@solidjs/router"
const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = createSignal(null);

  const fetchJobDetails = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/jobs/${id}/`);
    const data = await response.json();
    setJob(data);
  };

  createEffect(() => {
    fetchJobDetails();
  });

  return (
    <div class="container mx-auto p-6">
      {job() ? (
        <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">{job().title}</h2>
          <p class="text-lg text-gray-600 mb-2">
            <span class="font-semibold">Company:</span> {job().company_name}
          </p>
          <p class="text-lg text-gray-600 mb-2">
            <span class="font-semibold">Location:</span> {job().location}
          </p>
          <p class="text-lg text-green-600 font-semibold mb-4">
            Salary: {job().salary}
          </p>
          <p class="text-gray-800 mb-4">{job().description}</p>
          <p class="text-gray-500">
            <span class="font-semibold">Posted on:</span> {job().posted_at}
          </p>
          <div class="mt-6">
            <A
              href="/"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Back to Listings
            </A>
          </div>
        </div>
      ) : (
        <p class="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default JobDetailPage;
