import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://community-event-scheduler.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { accessToken } = data;
        localStorage.setItem('accessToken', accessToken); // Save the token to localStorage
        navigate('/home'); // Redirect to the home page
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.log('Network error:', err);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom right, #6a11cb, #2575fc)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '15px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <h2 className="card-title text-center mb-4" style={{ color: '#333' }}>
          Login
        </h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: '10px', padding: '10px' }}
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: '10px', padding: '10px' }}
              required
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#555',
              }}
            >
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </span>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              backgroundColor: '#6a11cb',
              border: 'none',
              borderRadius: '10px',
              padding: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s',
            }}
          >
            Submit
          </button>
        </form>
        <div className="text-center mt-4">
          <p style={{ marginBottom: '10px' }}>Don't have an account?</p>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/')}
            style={{
              borderRadius: '10px',
              padding: '10px',
              fontWeight: 'bold',
              backgroundColor: '#333',
              color: '#fff',
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
