
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import { logout } from "../../../services/auth";
import { useState } from "react";
import useStore from "../../../store";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setMoreDropdownOpen] = useState(false); // New signal for More dropdown
  const [searchQuery, setSearchQuery] = useState("");
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const {user} = useStore()

  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleCompanyFilterChange = (event) => setCompanyName(event.target.value);

  const handleSearchSubmit = () => {
    if (searchQuery.trim() || companyName.trim()) {
      navigate(`/?title=${searchQuery.trim()}&company_name=${companyName.trim()}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCompanyName("");
    navigate("/"); // Clear search query and filters
  };

  return (
    <header className="bg-gray-800 text-gray-200 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400">JobPortal</Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/view-job" className="hover:text-blue-400">Jobs</Link>
          <Link to="/about-us" className="hover:text-blue-400">About Us</Link>
          <Link to="/contact-us" className="hover:text-blue-400">Contact</Link>
          
          {/* Profile Dropdown */}
          
          {user?.role === "job_seeker" && (
             <button
             className="hover:text-blue-400"
           >
            <Link  to="/job-seekers">
             Profile
            </Link>
           </button>
          )}

          {user?.role === "employer" && (
             <button
             className="hover:text-blue-400"
           >
           <Link  to="/profile/employer">
             Profile
            </Link>
           </button>
          )}
          
          {/* <div className="relative">
            <button
              className="hover:text-blue-400"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              Profile
            </button>
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg rounded-md w-48">
                <li>
                  <Link
                    to="/job-seekers"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Job Seeker Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile/employer"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Employee Profile
                  </Link>
                </li>
              </ul>
            )}
          </div> */}

          {/* More Dropdown */}
          <div className="relative">
            <button
              className="hover:text-blue-400"
              onClick={() => setMoreDropdownOpen(!isMoreDropdownOpen)}
            >
              More
            </button>
            {isMoreDropdownOpen && (
              <ul className="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg rounded-md w-48">
                <li>
                  <Link
                    to="/faq"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/success-stories"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/compare-jobs"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Compare Jobs
                  </Link>
                </li>
                <li>
                  <a 
                   className="block px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                   onClick={logout} >
                    logout
                  </a>
                </li>

                
              </ul>
            )}
          </div>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <input
            type="text"
            className="p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Search Jobs..."
            value={searchQuery}
            onInput={handleSearchChange}
          />
          <input
            type="text"
            className="p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Company Name..."
            value={companyName}
            onInput={handleCompanyFilterChange}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={handleSearchSubmit}
          >
            Search
          </button>
          <button
            className="text-gray-200 hover:text-blue-400 transition"
            onClick={clearSearch}
          >
            Clear
          </button>
        </div>
        <button
          className="md:hidden text-gray-200 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-700 py-4">
          <ul className="space-y-4 text-center">
            <li><Link to="/" className="block text-gray-200 hover:text-blue-400">Jobs</Link></li>
            <li><Link to="/about-us" className="block text-gray-200 hover:text-blue-400">About Us</Link></li>
            <li><Link to="/contact-us" className="block text-gray-200 hover:text-blue-400">Contact</Link></li>
            <li><Link to="/login" className="block text-gray-200 hover:text-blue-400">Login</Link></li>
            <li><Link to="/signup" className="block text-gray-200 hover:text-blue-400">Signup</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
