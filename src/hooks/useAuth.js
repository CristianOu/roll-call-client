import { useContext, useDebugValue } from 'react';
import { Context as AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
  const { state } = useContext(AuthContext);
  useDebugValue(state, (state) => (state?.user ? 'Logged In' : 'Logged Out'));
  return useContext(AuthContext);
};

export default useAuth;
