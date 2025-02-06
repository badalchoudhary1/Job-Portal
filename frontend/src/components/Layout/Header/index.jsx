

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/auth";
import { useState } from "react";
import useStore from "../../../store";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const { user } = useStore();

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

  console.log(user, "user");

  return (
    <header className="bg-gray-800 text-gray-200 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400">
          JobPortal
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/view-job" className="hover:text-blue-400">
            Jobs
          </Link>
          <Link to="/about-us" className="hover:text-blue-400">
            About Us
          </Link>
          <Link to="/contact-us" className="hover:text-blue-400">
            Contact
          </Link>

          {user?.role === "job_seeker" && (
            <Link to="/" className="hover:text-blue-400">
              Profile
            </Link>
          )}
          {user?.role === "employer" && (
            <Link to="/employers" className="hover:text-blue-400">
              Profile
            </Link>
          )}

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
                  <Link to="/faq" className="block px-4 py-2 hover:bg-gray-100">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="block px-4 py-2 hover:bg-gray-100">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/success-stories" className="block px-4 py-2 hover:bg-gray-100">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link to="/compare-jobs" className="block px-4 py-2 hover:bg-gray-100">
                    Compare Jobs
                  </Link>
                </li>
                <li>
                  <button
                    className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
                    onClick={logout}
                  >
                    Logout
                  </button>
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
        <div>{user?.username || <Link to="/login">Login</Link>}</div>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-gray-700 py-4">
          <ul className="space-y-4 text-center">
            <li>
              <Link to="/" className="block text-gray-200 hover:text-blue-400">
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="block text-gray-200 hover:text-blue-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="block text-gray-200 hover:text-blue-400">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="block text-gray-200 hover:text-blue-400">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="block text-gray-200 hover:text-blue-400">
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
