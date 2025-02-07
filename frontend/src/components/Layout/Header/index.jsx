

// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../../services/auth";
// import { useState } from "react";
// import useStore from "../../../store";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [isMoreDropdownOpen, setMoreDropdownOpen] = useState(false);
//   const navigate = useNavigate();
//   const { user } = useStore();



//   console.log(user, "user");

//   return (
//     <header className="bg-gray-800 text-gray-200 shadow-md">
//       <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
//         <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400">
//           JobPortal
//         </Link>
//         <nav className="hidden md:flex space-x-6">
//         <Link to="/blog" className="hover:text-blue-400">
//             Blog
//           </Link>

//           <Link to="/about-us" className="hover:text-blue-400">
//             About Us
//           </Link>

//           {user?.role === "job_seeker" && (
//             <Link to="/job-list" className="hover:text-blue-400">
//               Profiles
//             </Link>
//           )}
//           {user?.role === "employer" && (
//             <Link to="/employers" className="hover:text-blue-400">
//               Profiles
//             </Link>
//           )}

//           <div className="relative">
//             <button
//               className="hover:text-blue-400"
//               onClick={() => setMoreDropdownOpen(!isMoreDropdownOpen)}
//             >
//               More
//             </button>
//             {isMoreDropdownOpen && (
//               <ul className="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg rounded-md w-48">
//                 <li>
//                   <Link to="/faq" className="block px-4 py-2 hover:bg-gray-100">
//                     FAQ
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/success-stories" className="block px-4 py-2 hover:bg-gray-100">
//                     Success Stories
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </div>
//         </nav>
//         <div className="flex items-center space-x-4">
//         <div>{user?.username || <Link to="/login">Login</Link>}</div>
//         <button
//                     className="block px-4 py-2 text-left  w-full"
//                     onClick={logout}
//                   >
//                     Logout
//                   </button></div>
//       </div>

//       {isMenuOpen && (
//         <nav className="md:hidden bg-gray-700 py-4">
//           <ul className="space-y-4 text-center">
//             <li>
//               <Link to="/about-us" className="block text-gray-200 hover:text-blue-400">
//                 About Us
//               </Link>
//             </li>
//             <li>
//               <Link to="/login" className="block text-gray-200 hover:text-blue-400">
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Link to="/signup" className="block text-gray-200 hover:text-blue-400">
//                 Signup
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;


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
