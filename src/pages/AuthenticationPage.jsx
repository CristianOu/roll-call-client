import React from 'react';
import AuthenticationForm from '../components/authentication-form/AuthenticationForm';


function AuthenticationPage({setSession, isSignUp}) {
  return (
    <div className='authentication-page-container'>
      <AuthenticationForm setSession={setSession} isSignUp={isSignUp} />
    </div>
  );
}

export default AuthenticationPage;