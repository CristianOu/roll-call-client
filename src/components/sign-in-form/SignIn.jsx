import React, { useContext, useState } from 'react';
import './SignIn.scss';
import { Context as AuthContext} from '../../contexts/AuthContext';

function SignIn() {
  const {state, signIn, clearErrorMessage} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSignIn = async(e) => {
    e.preventDefault();
    const isError = signIn({email, password});

    if(isError) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2500);
      clearErrorMessage();
    }
  }

  // console.log(state)

  return (
    <div className='sign-in-wrapper'>
      <div className="title">Sign In</div>
      <form onSubmit={handleSignIn}>
        <label className='field'>
          <div>Email</div>
          <input
          name='email'
          type={'email'}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          maxLength = "127"
        />
        </label>
        
        <label className='field'>
          <div>Password</div>
          <input
            name='password'
            type={'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            maxLength = "30"
          />
        </label>
        

        <button type="submit" value="submit-form">
          Sign In
        </button>

        
      </form>
      { showError ? <div className='error'>{state.errorMessage}</div> : '' }
    </div>
  );
}

export default SignIn;