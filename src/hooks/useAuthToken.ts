import { useState } from 'react';


export const useAuthToken = (TOKEN_NAME: string): any => {
    const clientToken = localStorage.getItem(TOKEN_NAME);

    const [token, setToken] = useState(clientToken);

    const isAuthorized = token == undefined;

    const setAuthToken = (authToken: string): void => {
        localStorage.setItem(TOKEN_NAME, authToken);
        setToken(authToken);
    }

    const removeAuthToken = () => {
        localStorage.removeItem(TOKEN_NAME);
        setToken(null);
    }

    return [token, isAuthorized, setAuthToken, removeAuthToken];
};
