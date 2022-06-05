import createDataContext from './createDataContext';
import http from '../services/http.service';

const ACTIONS = {
  ADD_ERROR: 'add_error',
  REFRESH_TOKEN: 'refresh_token',
  AUTHENTICATE: 'authenticate',
  CLEAR_ERROR_MESSAGE: 'clear_error_message',
  SIGN_OUT: 'sign_out'
};

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ERROR:
      return { ...state, errorMessage: action.payload };
    case ACTIONS.REFRESH_TOKEN:
      return { ...state, user: action.payload };
    case ACTIONS.AUTHENTICATE:
      return { errorMessage: '', user: action.payload };
    case ACTIONS.CLEAR_ERROR_MESSAGE:
      return { ...state, errorMessage: '' };
    case ACTIONS.SIGN_OUT:
      return { user: null, errorMessage: '' };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: ACTIONS.CLEAR_ERROR_MESSAGE });
};

const tryLocalSignIn = (dispatch) => async () => {
  console.log('');
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

const signUp =
  (dispatch) =>
  async ({ email, password }) => {
    console.log('');
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

const refreshToken =
  (dispatch) =>
  async ({ accessToken, claims }) => {
    try {
      const user = { accessToken, claims };

      dispatch({ type: ACTIONS.REFRESH_TOKEN, payload: user });
    } catch (error) {
      let message = '';
      if (error.response?.status === 422) {
        message = 'Missing Username or Password';
      } else if (error.response?.status === 401) {
        message = 'Unauthorized';
      } else {
        message = 'Something went wrong with login';
      }
      dispatch({ type: ACTIONS.ADD_ERROR, payload: message });
    }
  };

const signIn =
  (dispatch) =>
  async ({ email, password, navigate, from }) => {
    try {
      const response = await http.post(
        '/api/users/login',
        {
          email: email,
          password: password
        },
        {
          headers: { 'Content-Type': 'application/json' }
          // withCredentials: true
        }
      );
      console.log(response?.data);

      // const accessToken = response?.data?.accessToken;
      // const role = response?.data?.role;

      if (response.data) {
        // window.sessionStorage.setItem('userClaims', JSON.stringify(response.data));
        dispatch({ type: ACTIONS.AUTHENTICATE, payload: response.data });
        navigate(from, { replace: true });
      }
    } catch (error) {
      let message = '';
      if (error.response?.status === 422) {
        message = 'Missing Username or Password';
      } else if (error.response?.status === 401) {
        message = 'Unauthorized';
      } else {
        message = 'Something went wrong with login';
      }
      dispatch({ type: ACTIONS.ADD_ERROR, payload: message });
    }
  };

const signOut =
  (dispatch) =>
  async ({ navigate }) => {
    try {
      const response = await http.get('/logout');

      if (response.data) {
        dispatch({ type: ACTIONS.SIGN_OUT });
        navigate('/login', { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signOut, signUp, clearErrorMessage, tryLocalSignIn, refreshToken },
  { user: null, errorMessage: '' }
);
