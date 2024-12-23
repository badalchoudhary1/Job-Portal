import { createSignal } from "solid-js";

function ContactUs() {
  const [formData, setFormData] = createSignal({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData());
    alert("Your message has been sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="p-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-gray-700 text-center mb-12">
          We'd love to hear from you! Whether you have a question or just want to give feedback,
          feel free to reach out.
        </p>

        <div className="flex flex-wrap -mx-4">
          {/* Contact Form */}
          <div className="w-full md:w-2/3 px-4 mb-8 md:mb-0">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData().name}
                  onInput={handleChange}
                  placeholder="Enter your name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData().email}
                  onInput={handleChange}
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData().subject}
                  onInput={handleChange}
                  placeholder="Subject"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData().message}
                  onInput={handleChange}
                  placeholder="Write your message here..."
                  rows="5"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/3 px-4">
            <div className="bg-white shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Our Contact Information</h2>
              <ul className="space-y-4 text-gray-700">
                <li>
                  <strong>Address:</strong> <br />
                  123 JobPortal Street, Suite 100, JobCity, JobState, 12345
                </li>
                <li>
                  <strong>Phone:</strong> <br />
                  +1 (555) 123-4567
                </li>
                <li>
                  <strong>Email:</strong> <br />
                  <a href="mailto:support@jobportal.com" className="text-blue-500">
                    support@jobportal.com
                  </a>
                </li>
                <li>
                  <strong>Office Hours:</strong> <br />
                  Monday - Friday, 9:00 AM - 5:00 PM
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
