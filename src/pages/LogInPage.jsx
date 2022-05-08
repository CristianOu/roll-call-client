import React from 'react';
import AuthorisationForm from '../components/authorisation-form/AuthorisationForm';

function LoginPage({className, setSession}) {
  return (
    <div className={className}>
      <AuthorisationForm setSession={setSession}/>
    </div>
  );
}

export default LoginPage;