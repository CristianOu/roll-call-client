import React, { useState } from 'react';
import http from '../../services/http.service';
import { useNavigate } from 'react-router-dom';
import './AuthorisationForm.scss';

function AuthorisationForm({ setSession }) {
  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await http.post('/api/users/login', {
        email: email,
        password: password
      });
      console.log('response', response.data);

      if (response.data.message) {
        setError(response.data.message);
        setShowError(true);

        setTimeout(function() {
          setShowError(false)
        }, 2500);

      } else {
        await window.sessionStorage.setItem('userClaims', JSON.stringify(response.data));
        setSession(response.data);
        navigate('/');
      }

      
    } catch (error) {
      console.log(error);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div class='login-wrapper'>
      <div class="shape"></div>
      <div class="shape"></div>
      <div className="login-form-container">
      <div className="title">Login</div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label className='field'>
          <div>Email</div>
          <input
          name="email"
          type={'email'}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          maxLength = "127"
          autoComplete="off"
        />
        </label>
        
        <label className='field'>
          <div>Password</div>
          <input
            name="password"
            type={'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="off"
            maxLength = "30"
          />
        </label>
        

        <button type="submit" value="submit-form">
          Log In
        </button>

        
      </form>
      <div className='signup-text'>Don't have an account? <span>Sign Up</span></div>
      { showError ? <div className='error'>*Username/password incorrect.</div> : '' }
    </div>
    </div>
    
  );
}

export default AuthorisationForm;
