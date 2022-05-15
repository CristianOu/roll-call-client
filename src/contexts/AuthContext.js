// import React from 'react';
import createDataContext from './createDataContext';
// import { navigate } from '../navigationRef';
import {getSignIn} from '../services/api';
import http from '../services/http.service';



const ACTIONS = {
  ADD_ERROR: 'add_error',
  AUTHENTICATE: 'authenticate',
  CLEAR_ERROR_MESSAGE: 'clear_error_message',
  SIGN_OUT: 'sign_out'
};

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ERROR:
      return { ...state, errorMessage: action.payload };
    case ACTIONS.AUTHENTICATE:
      return { errorMessage: '', token: action.payload }; // we don't need to persist state; signin and signup are the same
    case ACTIONS.CLEAR_ERROR_MESSAGE:
      return { ...state, errorMessage: '' };
    case ACTIONS.SIGN_OUT:
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: ACTIONS.CLEAR_ERROR_MESSAGE });
};

const tryLocalSignIn = (dispatch) => async () => {
  console.log('')
  // const token = await AsyncStorage.getItem('token');

  // if (token) {
  //   dispatch({ type: ACTIONS.AUTHENTICATE, payload: token });
  //   navigate('mainFlow');
  // } else {
  //   const viewedOnboarding = await AsyncStorage.getItem('viewedOnboarding');

  //   if (!viewedOnboarding) {
  //     navigate('Welcome');
  //   } else {
  //     navigate('SignIn');
  //   }
  // }
};

const finishOnboarding = () => async () => {
  console.log('')
  // await AsyncStorage.setItem('viewedOnboarding', 'true');

  // navigate('SignIn');
};

const signUp =(dispatch) => async ({ email, password }) => {
  console.log('')
    // implicit return, doesn't have to be specified
    // try {
    //   const response = await API.post('/signup', { email, password });
    //   await AsyncStorage.setItem('token', response.data.token);
    //   dispatch({ type: ACTIONS.AUTHENTICATE, payload: response.data.token });

    //   navigate('mainFlow');
    // } catch (err) {
    //   dispatch({
    //     type: ACTIONS.ADD_ERROR,
    //     payload: 'Something went wrong with sign up.'
    //   });
    // }
  };

const signIn = (dispatch) => async ( {email, password} ) => {
  try {
    const response = await getSignIn(email, password);

    if (response.data.message) {
      dispatch({ type: ACTIONS.ADD_ERROR, payload: '* Email/Password incorrect.'});
      return true;
    } else {
      window.sessionStorage.setItem('userClaims', JSON.stringify(response.data));
      dispatch({ type: ACTIONS.AUTHENTICATE, payload: response.data});
      window.location.pathname = '/';
    }
  } catch (error) {
    dispatch({ type: ACTIONS.ADD_ERROR, payload: 'Internal Server Error'});
    return true;
  }
};

const signOut = (dispatch) => () => {
  console.log('signout')
  window.sessionStorage.removeItem('userClaims');
  dispatch({ type: ACTIONS.SIGN_OUT });
  window.location.pathname = '/login';
  // await AsyncStorage.removeItem('token');
  // dispatch({ type: ACTIONS.SIGN_OUT });
  // navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signOut, signUp, clearErrorMessage, tryLocalSignIn, finishOnboarding },
  { token: null, errorMessage: '' }
);