

// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import useStore from '../store';
// import { register as registerUser } from '../services/auth';
// import { useState } from 'react';

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
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   const handleRegister = async (data) => {
//     try {
//       const response = await registerUser(data.username, data.email, data.password, data.role);
//       const { token, role: userRole } = response.data;
      
//       useStore.getState().setToken(token);
//       useStore.getState().setUser({ username: data.username, email: data.email, role: userRole });

//       setSuccess(true);
//       setTimeout(() => navigate("/profile"), 1000);
//     } catch (error) {
//       console.error('Registration error', error.response?.data || error.message);
//       setError(error.response?.data?.non_field_errors?.[0] || 'Registration failed.');
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <AuthHeader />
//       <main className="flex flex-1 items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
//           <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
//             <div>
//               <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
//               <input
//                 {...register('username', { required: 'Username is required' })}
//                 className="w-full p-3 border rounded-lg"
//               />
//               {errors.username && <p className="text-red-500">{errors.username.message}</p>}
//             </div>
//             <div>
//               <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
//               <input
//                 type="email"
//                 {...register('email', { required: 'Email is required' })}
//                 className="w-full p-3 border rounded-lg"
//               />
//               {errors.email && <p className="text-red-500">{errors.email.message}</p>}
//             </div>
//             <div>
//               <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
//               <input
//                 type="password"
//                 {...register('password', { required: 'Password is required' })}
//                 className="w-full p-3 border rounded-lg"
//               />
//               {errors.password && <p className="text-red-500">{errors.password.message}</p>}
//             </div>
//             <div>
//               <label className="block mb-2 text-sm">Role</label>
//               <select {...register('role')} className="w-full p-3 border rounded-lg">
//                 <option value="job_seeker">Job Seeker</option>
//                 <option value="employer">Employer</option>
//               </select>
//             </div>
//             {error && <div className="text-red-500">{error}</div>}
//             {success && <div className="text-green-500">Registration successful!</div>}
//             <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
//               Register
//             </button>
//           </form>
//         </div>
//       </main>
//       <AuthFooter />
//     </div>
//   );
// };

// export default Register;

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import { register as registerUser } from '../services/auth';
import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

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

// Zod schema for form validation
const registerSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9@_]+$/, 'Username must contain both letters and numbers and can only include letters, numbers, @, and underscores'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  role: z.string().nonempty('Role is required')
});

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      const response = await registerUser(data.username, data.email, data.password, data.role);
      const { token, role: userRole } = response.data;
  
      useStore.getState().setToken(token);
      useStore.getState().setUser({ username: data.username, email: data.email, role: userRole });
  
      setSuccess(true);
      toast.success('Registration successful! Redirecting...');
      setTimeout(() => navigate("/profile"), 1000);
    } catch (error) {
      console.error('Registration error', error.response?.data || error.message);
  
      let errorMessage = 'Registration failed.'; // Default error message
  
      // Check if the error has a 400 status
      if (error.response?.status === 400) {
        errorMessage = 'Your username already exists.';
      }
  
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center bg-gray-100 py-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
              <input
                {...register('username')}
                className="w-full p-3 border rounded-lg"
              />
              {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                {...register('email')}
                className="w-full p-3 border rounded-lg"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                {...register('password')}
                className="w-full p-3 border rounded-lg"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm">Role</label>
              <select {...register('role')} className="w-full p-3 border rounded-lg">
                <option value="job_seeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
              {errors.role && <p className="text-red-500">{errors.role.message}</p>}
            </div>
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">Registration successful!</div>}
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
              Register
            </button>
          </form>
        </div>
      </main>
      <AuthFooter />
    </div>
  );
};

export default Register;
