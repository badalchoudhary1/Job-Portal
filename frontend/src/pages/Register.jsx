

import { createSignal } from 'solid-js';
import { register } from '../services/auth';

const Register = () => {
  const [username, setUsername] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const [success, setSuccess] = createSignal(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const response = await register(username(), email(), password());
      alert('Registration successful');
      setSuccess(true);
      window.location.href = '/profile';  // Redirect to profile after registration
    } catch (error) {
      console.error('Registration error', error.response?.data || error.message);
      setError(error.response?.data?.username?.[0] || 'Registration failed. Please try again.');
    }
  };

  return (
    <div class="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label for="username">Username</label>
          <input
            type="text"
            id="username"  // Unique id for autofill and accessibility
            name="username"  // Name attribute for form data submission
            value={username()}
            onInput={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"  // Unique id for autofill and accessibility
            name="email"  // Name attribute for form data submission
            value={email()}
            onInput={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"  // Unique id for autofill and accessibility
            name="password"  // Name attribute for form data submission
            value={password()}
            onInput={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error() && <div class="error">{error()}</div>}
        {success() && <div class="success">Registration successful! Redirecting...</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
