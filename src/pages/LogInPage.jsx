import React from 'react';
import AuthorisationForm from '../components/authorisation-form/AuthorisationForm';

function LoginPage({className}) {
  return (
    <div className={className}>
      <AuthorisationForm />
    </div>
  );
}

export default LoginPage;