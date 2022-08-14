import { getCookie, setCookie } from 'cookies-next';
import axiosInstance from './axios';

export const authUser = async (address: string, chainType: string): Promise<string | undefined> => {
  console.log('auth requested');
  const jwt = getCookie('jwt-token');
  if (!jwt) {
    const response = await axiosInstance.post(`${process.env.BACKEND_URL}auth/authUser`, {
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
      if (response.data.data.whitelistId) {
        return response.data.data.whitelistId;
      }
    }
  }
}

export const authWhitelistMember = async (address: string, chainType: string, link: string): Promise<string | undefined> => {

  const response = await axiosInstance.post(`${process.env.BACKEND_URL}auth/authWhitelistMember`, {
    address: address,
    networkType: chainType,
    link: link
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.data.data) {
    return response.data.data.address
  }

}


