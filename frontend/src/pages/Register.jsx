// import { useEffect, useState } from 'react';
// import { register } from '../services/auth';
// import { useNavigate } from 'react-router-dom';
// import useStore from '../store';

// const AuthHeader = () => (
//   <header className="bg-blue-500 text-white p-4 text-center text-xl font-bold">
//     Welcome to Job Portal
//   </header>
// );

// const AuthFooter = () => (
//   <footer className="bg-gray-200 text-center p-4 text-sm">
//     &copy; 2024 Job Portal. All rights reserved.
//   </footer>
// );

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [user_type, setUserType] = useState('job_seeker');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await register(username, email, password, user_type);
//       const { token, user } = response.data;
//       useStore.getState().setToken(token);
//       useStore.getState().setUser(user);
//       setSuccess(true);
//       setTimeout(() => {
//         navigate("/profile");
//       }, 1000);
//     } catch (error) {
//       console.error('Registration error', error.response?.data || error.message);
//       setError(error.response?.data?.username?.[0] || 'Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <AuthHeader />
//       <main className="flex flex-1 items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
//           <form onSubmit={handleRegister} className="space-y-6">
//             <div>
//               <label htmlFor="username" className="block mb-2 text-sm font-medium">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={username}
//                 onInput={(e) => setUsername(e.target.value)}
//                 required
//                 className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="block mb-2 text-sm font-medium">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={email}
//                 onInput={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block mb-2 text-sm font-medium">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={password}
//                 onInput={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
//               />
//             </div>

//             <div>
//               <label htmlFor="user_type" className="block mb-2 text-sm font-medium">
//                 Register As
//               </label>
//               <select
//                value={user_type}
//                onChange={({target: {value}}) => setUserType(value)}
//                className="block mb-2 text-sm font-medium w-full h-10" name="user_type" id="user_type">
//                 <option value="employer">Employer</option>
//                 <option value="job_seeker">Job Seeker</option>
//               </select>
//             </div>

//             {error && <div className="text-red-500 text-sm text-center">{error}</div>}
//             {success && <div className="text-green-500 text-sm text-center">Registration successful! Redirecting...</div>}
//             <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
//               Register
//             </button>
//           </form>
//           <div className="text-center mt-4">
//             <button onClick={() => navigate("/login")} className="text-blue-600 hover:underline">
//               Login Here
//             </button>
//           </div>
//         </div>
//       </main>
//       <AuthFooter />
//     </div>
//   );
// };

// export default Register;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import { register } from '../services/auth';

const AuthHeader = () => (
  <header className="bg-blue-500 text-white p-4 text-center text-xl font-bold">
    Welcome to Job Portal
  </header>
);

const AuthFooter = () => (
  <footer className="bg-gray-200 text-center p-4 text-sm">
    &copy; 2024 Job Portal. All rights reserved.
  </footer>
);

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('job_seeker');  // Use role instead of user_type
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(username, email, password, role);  // Make sure to pass role
      const { token, role: userRole } = response.data;

      // Set token and user role in the store
      useStore.getState().setToken(token);
      useStore.getState().setUser({ username, email, role: userRole });

      setSuccess(true);

      // Redirect to profile page after 1 second
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      console.error('Registration error', error.response?.data || error.message);
      setError(error.response?.data?.non_field_errors?.[0] || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label htmlFor="role" className="block mb-2 text-sm font-medium">
                Register As
              </label>
              <select
                value={role}
                onChange={({ target: { value } }) => setRole(value)}
                className="block mb-2 text-sm font-medium w-full h-10"
                name="role"
                id="role"
              >
                <option value="employer">Employer</option>
                <option value="job_seeker">Job Seeker</option>
              </select>
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            {success && <div className="text-green-500 text-sm text-center">Registration successful! Redirecting...</div>}

            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
              Register
            </button>
          </form>

          <div className="text-center mt-4">
            <button onClick={() => navigate("/login")} className="text-blue-600 hover:underline">
              Login Here
            </button>
          </div>
        </div>
      </main>
      <AuthFooter />
    </div>
  );
};

export default Register;
