
import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { useNavigate } from "@solidjs/router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  const [isDropdownOpen, setDropdownOpen] = createSignal(false);
  const [isMoreDropdownOpen, setMoreDropdownOpen] = createSignal(false); // New signal for More dropdown
  const [searchQuery, setSearchQuery] = createSignal("");
  const [companyName, setCompanyName] = createSignal("");
  const navigate = useNavigate();

  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleCompanyFilterChange = (event) => setCompanyName(event.target.value);

  const handleSearchSubmit = () => {
    if (searchQuery().trim() || companyName().trim()) {
      navigate(`/?title=${searchQuery().trim()}&company_name=${companyName().trim()}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCompanyName("");
    navigate("/"); // Clear search query and filters
  };

  return (
    <header class="bg-gray-800 text-gray-200 shadow-md">
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
        <A href="/" class="text-2xl font-bold text-white hover:text-blue-400">JobPortal</A>
        <nav class="hidden md:flex space-x-6">
          <A href="/view-job" class="hover:text-blue-400">Jobs</A>
          <A href="/about-us" class="hover:text-blue-400">About Us</A>
          <A href="/contact-us" class="hover:text-blue-400">Contact</A>
          
          {/* Profile Dropdown */}
          <div class="relative">
            <button
              class="hover:text-blue-400"
              onClick={() => setDropdownOpen(!isDropdownOpen())}
            >
              Profile
            </button>
            {isDropdownOpen() && (
              <ul class="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg rounded-md w-48">
                <li>
                  <A
                    href="/job-seekers"
                    class="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Job Seeker Profile
                  </A>
                </li>
                <li>
                  <A
                    href="/profile/employer"
                    class="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Employee Profile
                  </A>
                </li>
              </ul>
            )}
          </div>

          {/* More Dropdown */}
          <div class="relative">
            <button
              class="hover:text-blue-400"
              onClick={() => setMoreDropdownOpen(!isMoreDropdownOpen())}
            >
              More
            </button>
            {isMoreDropdownOpen() && (
              <ul class="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg rounded-md w-48">
                <li>
                  <A
                    href="/faq"
                    class="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    FAQ
                  </A>
                </li>
                <li>
                  <A
                    href="/blog"
                    class="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Blog
                  </A>
                </li>
                <li>
                  <A
                    href="/success-stories"
                    class="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Success Stories
                  </A>
                </li>
                <li>
                  <A
                    href="/compare-jobs"
                    class="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Compare Jobs
                  </A>
                </li>
              </ul>
            )}
          </div>
        </nav>
        <div class="hidden md:flex items-center gap-4">
          <input
            type="text"
            class="p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Search Jobs..."
            value={searchQuery()}
            onInput={handleSearchChange}
          />
          <input
            type="text"
            class="p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Company Name..."
            value={companyName()}
            onInput={handleCompanyFilterChange}
          />
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={handleSearchSubmit}
          >
            Search
          </button>
          <button
            class="text-gray-200 hover:text-blue-400 transition"
            onClick={clearSearch}
          >
            Clear
          </button>
        </div>
        <button
          class="md:hidden text-gray-200 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen())}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen() ? (
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>
      {isMenuOpen() && (
        <nav class="md:hidden bg-gray-700 py-4">
          <ul class="space-y-4 text-center">
            <li><A href="/" class="block text-gray-200 hover:text-blue-400">Jobs</A></li>
            <li><A href="/about-us" class="block text-gray-200 hover:text-blue-400">About Us</A></li>
            <li><A href="/contact-us" class="block text-gray-200 hover:text-blue-400">Contact</A></li>
            <li><A href="/login" class="block text-gray-200 hover:text-blue-400">Login</A></li>
            <li><A href="/signup" class="block text-gray-200 hover:text-blue-400">Signup</A></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
