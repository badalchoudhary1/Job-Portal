import { createSignal } from 'solid-js';
import { login } from '../services/auth';
import { useNavigate } from '@solidjs/router';

const Login = () => {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username(), password());
      setError('');
      alert('Login successful');
      navigate("/profile"); // Redirect to profile after login
    } catch (error) {
      console.error('Login error', error.response?.data || error.message);
      setError('Invalid credentials. Please try again.');
    }
  };
  const goToRegister = () => {
    navigate("/register");  // Redirect to registration page
  };

  return (
    <div class="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            value={username()}
            onInput={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            value={password()}
            onInput={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error() && <div class="error">{error()}</div>}
        <button type="submit">Login</button>
      </form>
      <button
            onClick={goToRegister}
            class="text-blue-600 hover:underline mt-2"
          >
            Register Here
          </button>
    </div>
  );
};

export default Login;
