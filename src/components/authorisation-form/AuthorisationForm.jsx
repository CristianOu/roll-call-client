import React, { useState } from 'react';
import http from "../../services/http.service";

function AuthorisationForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await http.post('/api/users/login', {
        email: email,
        password: password
      });  
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    setEmail('');
    setPassword('');
  };


  return (
    <div className='login-form-container'>
      <div className='buttons-box'>
        <div>
          Sign In
        </div>
        <div>
          Sign Up
        </div>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off" >
        <input 
          name='email' 
          type={'email'} 
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="off" 
        />
        <input 
          name='password' 
          type={'password'} 
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          autoComplete="off" 
        />

        <button type='submit' value='submit-form'>Log In</button>
      </form>
    </div>
  );
}

export default AuthorisationForm;