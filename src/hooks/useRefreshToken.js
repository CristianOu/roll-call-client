import http from '../services/http.service';
import useAuth from './useAuth';
import { logDOM } from '@testing-library/react';

const useRefreshToken = () => {
  const { refreshToken } = useAuth();

  return async () => {
    const response = await http.get('/refresh', { withCredentials: true });

    if (response.data.accessToken && response.data.claims) {
      console.log('REFRESH', response.data);
      refreshToken({
        accessToken: response.data.accessToken,
        claims: response.data.claims
      });
    }
    return response.data.accessToken;
  };
};

export default useRefreshToken;
