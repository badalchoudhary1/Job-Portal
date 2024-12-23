import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

const JobSeekerForm = () => {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [phone, setPhone] = createSignal("");
  const [skills, setSkills] = createSignal("");
  const [bio, setBio] = createSignal("");
  const [location, setLocation] = createSignal("");
  const [resume, setResume] = createSignal(null);
  const [profilePicture, setProfilePicture] = createSignal(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name());
    formData.append("email", email());
    formData.append("phone", phone());
    formData.append("skills", skills());
    formData.append("bio", bio());
    formData.append("location", location());
    if (resume()) formData.append("resume", resume());
    if (profilePicture()) formData.append("profile_picture", profilePicture());
  
    // Debugging: Log all FormData key-value pairs
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    fetch("http://127.0.0.1:8000/api/job-seekers/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          navigate("/job-seekers");
        } else {
          console.error("Failed to save job seeker profile.");
          response.text().then((text) => console.error(text));
        }
      })
      .catch((error) => {
        console.error("Error during submission:", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      class="p-6 max-w-lg mx-auto border rounded shadow-sm"
    >
      <h1 class="text-2xl font-bold mb-4">Job Seeker Form</h1>
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Name</label>
        <input
          type="text"
          class="w-full px-3 py-2 border rounded"
          value={name()}
          onInput={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          class="w-full px-3 py-2 border rounded"
          value={email()}
          onInput={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Phone</label>
        <input
          type="text"
          class="w-full px-3 py-2 border rounded"
          value={phone()}
          onInput={(e) => setPhone(e.target.value)}
        />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Skills</label>
        <textarea
          class="w-full px-3 py-2 border rounded"
          value={skills()}
          onInput={(e) => setSkills(e.target.value)}
        ></textarea>
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Bio</label>
        <textarea
          class="w-full px-3 py-2 border rounded"
          value={bio()}
          onInput={(e) => setBio(e.target.value)}
        ></textarea>
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Location</label>
        <input
          type="text"
          class="w-full px-3 py-2 border rounded"
          value={location()}
          onInput={(e) => setLocation(e.target.value)}
        />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Resume</label>
        <input
          type="file"
          onInput={(e) => setResume(e.target.files[0])}
        />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Profile Picture</label>
        <input
          type="file"
          onInput={(e) => setProfilePicture(e.target.files[0])}
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default JobSeekerForm;
