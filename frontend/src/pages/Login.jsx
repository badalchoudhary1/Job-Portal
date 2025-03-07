import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
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
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required')
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await login(data.username, data.password);
      console.log(response);
      setError('');
      toast.success('Login successful! Redirecting...');
      navigate("/profile");
    } catch (error) {
      console.error('Login error', error.response?.data || error.message);
      const errorMessage = error.response?.data?.non_field_errors?.[0] || 'Invalid credentials. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const goToRegister = () => navigate("/register");

  return (
    <div className="flex flex-col min-h-screen">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center bg-gray-100 py-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
              <input
                type="text"
                {...register('username')}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
              />
              {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                {...register('password')}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <button onClick={goToRegister} className="text-blue-600 hover:underline">
              Register Here
            </button>
          </div>
        </div>
      </main>
      <AuthFooter />
    </div>
  );
};

export default Login;
