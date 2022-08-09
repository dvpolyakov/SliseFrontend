import { getCookie, setCookie } from 'cookies-next';
import axiosInstance from './axios';
import { BACKEND_URL } from './endpoints';

export const authUser = async (address: string, chainType: string, off?: any) => {
  const jwt = getCookie('jwt-token');
  if(off !== true){
    if (!jwt) {
      const response = await axiosInstance.post(`${BACKEND_URL}auth/authUser`, {
        address: address,
        networkType: chainType
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      if (response.data.data) {
        setCookie('jwt-token', response.data.data.accessToken);
        setCookie('jwt-token-exp', response.data.data.expiresIn);
        setCookie('current-chain', response.data.data.chainType);
      }
    }
  }
}

