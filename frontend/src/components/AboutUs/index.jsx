const AboutUs = () => {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white py-16">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-lg">
              Discover how <span className="font-semibold">Job Portal</span> is reshaping the way employers and job seekers connect. 
              Empowering careers, building futures.
            </p>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="max-w-5xl mx-auto p-6 space-y-16">
          {/* Introduction */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Who We Are</h2>
            <p className="text-gray-700 text-lg">
              Job Portal is an innovative platform designed to simplify the hiring process for employers 
              and make job searching a seamless experience for professionals. Our platform leverages cutting-edge technology 
              and user-focused design to ensure an effortless journey from application to hiring.
            </p>
          </section>
  
          {/* Services Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-2">For Job Seekers</h3>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Access to thousands of job listings across industries.</li>
                  <li>Personalized recommendations based on your skills and interests.</li>
                  <li>Easy application process with one-click apply options.</li>
                </ul>
              </div>
              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-2">For Employers</h3>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Post jobs and find top talent quickly.</li>
                  <li>Advanced filtering to shortlist candidates efficiently.</li>
                  <li>Tools to manage applications and communication seamlessly.</li>
                </ul>
              </div>
            </div>
          </section>
  
          {/* Vision and Mission */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Vision and Mission</h2>
            <div className="space-y-6">
              <div className="bg-blue-100 p-6 rounded-lg shadow">
                <h3 className="text-2xl font-bold text-blue-600 mb-2">Our Vision</h3>
                <p className="text-gray-700">
                  To create a world where everyone has equal opportunities to achieve their career goals, 
                  and organizations can easily connect with the right talent.
                </p>
              </div>
              <div className="bg-green-100 p-6 rounded-lg shadow">
                <h3 className="text-2xl font-bold text-green-600 mb-2">Our Mission</h3>
                <p className="text-gray-700">
                  To bridge the gap between job seekers and employers with a user-centric, 
                  technology-driven platform that fosters growth and innovation.
                </p>
              </div>
            </div>
          </section>
  
          {/* Testimonials */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">What Our Users Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-white p-6 shadow rounded-lg">
                <p className="italic text-gray-700">
                  "Job Portal helped me land my dream job in just two weeks! The platform is intuitive and 
                  made applying to jobs a breeze."
                </p>
                <p className="text-right mt-4 font-bold text-gray-800">- A Happy Job Seeker</p>
              </div>
              <div className="bg-white p-6 shadow rounded-lg">
                <p className="italic text-gray-700">
                  "We've hired some of our best employees through Job Portal. The advanced filtering options 
                  saved us so much time!"
                </p>
                <p className="text-right mt-4 font-bold text-gray-800">- An Satisfied Employer</p>
              </div>
            </div>
          </section>
  
          {/* Team Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full mb-4"></div>
                <h3 className="font-bold text-lg">John Doe</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full mb-4"></div>
                <h3 className="font-bold text-lg">Jane Smith</h3>
                <p className="text-gray-600">Head of Development</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full mb-4"></div>
                <h3 className="font-bold text-lg">Emily Johnson</h3>
                <p className="text-gray-600">Marketing Specialist</p>
              </div>
            </div>
          </section>
  
          {/* Contact Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
            <p className="text-gray-700">
              Have questions or want to collaborate? Reach out to us at:
            </p>
            <p className="text-blue-500 font-bold mt-2">
              <a href="mailto:support@jobportal.com" className="underline">support@jobportal.com</a>
            </p>
          </section>
        </div>
      </div>
    );
  };
  
  export default AboutUs;
  