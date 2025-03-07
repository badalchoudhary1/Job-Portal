import { Link } from "react-router-dom";
import { logout } from "../../../services/auth";
import useStore from "../../../store";
import { useState } from "react";

const Header = () => {
  const [isMoreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const { user } = useStore();

  return (
    <header className="bg-gray-800 text-gray-200 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400">
          JobPortal
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-400">Blog</Link>
          <Link to="/about-us" className="hover:text-blue-400">About Us</Link>

          {user?.role === "job_seeker" && (
            <Link to="/job-list" className="hover:text-blue-400">Profiles</Link>
          )}
          {user?.role === "employer" && (
            <Link to="/employers" className="hover:text-blue-400">Profiles</Link>
          )}

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
                  <Link to="/faq" className="block px-4 py-2 hover:bg-gray-100">FAQ</Link>
                </li>
                <li>
                  <Link to="/success-stories" className="block px-4 py-2 hover:bg-gray-100">Success Stories</Link>
                </li>
          {user?.role === "job_seeker" && (
            <li>
              <Link to="/job-seekers/new" className="block px-4 py-2 hover:bg-gray-100">Create your profile</Link>
            </li>
          )}
          {user?.role === "employer" && (
            <li>
              <Link to="/create-emp" className="block px-4 py-2 hover:bg-gray-100">Create your profile</Link>
            </li>
          )}
              </ul>
            )}
          </div>
        </nav>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {user?.username ? (
            <>
              <span>{user.username}</span>
              <button className="px-4 py-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-400">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
