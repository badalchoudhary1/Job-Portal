
const Footer  = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold">JobPortal</h3>
            <p className="mt-2 text-sm">
              Your one-stop platform for connecting talent with opportunity. Join us to build your career.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/jobs" className="hover:underline">Browse Jobs</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="mt-2 flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                className="hover:text-blue-500"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H8.13v-2.88h2.37v-2.2c0-2.34 1.39-3.64 3.53-3.64.69 0 1.44.12 1.44.12v1.99h-.81c-.8 0-1.05.5-1.05 1.02v1.71h2.11l-.34 2.88h-1.77v6.99A10.01 10.01 0 0 0 22 12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                className="hover:text-blue-400"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.25c7.55 0 11.67-6.26 11.67-11.67 0-.18 0-.35-.01-.53A8.35 8.35 0 0 0 22 5.92a8.19 8.19 0 0 1-2.36.65 4.11 4.11 0 0 0 1.8-2.27 8.22 8.22 0 0 1-2.61 1 4.1 4.1 0 0 0-6.98 3.74A11.65 11.65 0 0 1 3.15 4.47a4.09 4.09 0 0 0 1.27 5.47 4.1 4.1 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.29 4.01 4.11 4.11 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.58a11.6 11.6 0 0 0 6.29 1.84" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="hover:text-blue-600"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.3c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.3h-3v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2v4.5h-3v-9h3v1.22c.87-1.56 3.43-1.68 4.31-.16.23.4.36.86.36 1.34v6.6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>&copy; 2024 JobPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
