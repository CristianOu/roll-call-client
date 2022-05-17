import http from '../services/http.service';
import useAuth from './useAuth';
import { logDOM } from '@testing-library/react';

const useRefreshToken = () => {
  const { refreshToken } = useAuth();

  return async () => {
    const response = await http.get('/refresh', { withCredentials: true });

    if (response.data.accessToken) {
      console.log('REFRESH', response.data);
      refreshToken({ accessToken: response.data.accessToken });
    }
    return response.data.accessToken;
  };
};

export default useRefreshToken;
