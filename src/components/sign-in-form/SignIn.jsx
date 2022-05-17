import React, { useState } from 'react';
import './SignIn.scss';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

function SignIn() {
  const { state, signIn, clearErrorMessage } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const result = signIn({ email, password, navigate, from });

    if (result) {
      setShowError(true);
      clearErrorMessage();
    }
  };

  // console.log(state);

  return (
    <div className="sign-in-wrapper">
      <div className="title">Sign In</div>
      <form onSubmit={handleSignIn}>
        <label className="field">
          <div>Email</div>
          <input
            name="email"
            type={'email'}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="field">
          <div>Password</div>
          <input
            name="password"
            type={'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        <button type="submit" value="submit-form">
          Sign In
        </button>
      </form>
      {showError ? <div className="error">{state.errorMessage}</div> : ''}
    </div>
  );
}

export default SignIn;
