import React from 'react';
import AuthenticationForm from '../../components/authentication-form/AuthenticationForm';
import './AuthenticationPage.scss';

function AuthenticationPage({ setSession, isSignUp }) {
  const nameOfEducation =
    'Københavns Erhvervsakademi / Copenhagen School of Design and Technology';

  return (
    <div className="authentication-page-container">
      <div className="education-name">{nameOfEducation}</div>
      <AuthenticationForm setSession={setSession} isSignUp={isSignUp} />
    </div>
  );
}

export default AuthenticationPage;
