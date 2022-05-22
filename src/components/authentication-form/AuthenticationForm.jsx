import React from 'react';

import './AuthenticationForm.scss';
import SignIn from '../sign-in-form/SignIn';

function AuthenticationForm() {
  return (
    <div className='authentication-wrapper'>
      <div className='shape'></div>
      <div className='shape'></div>
      <div className='authentication-form-container'>
        <SignIn />
    </div>
    </div>
    
  );
}

export default AuthenticationForm;
