import { useState } from 'react';

export default function useToken() {
    // Get token function from Local Storage
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    };

    // Token State
    const [token, setToken] = useState(getToken());

    // Save token to Local Storage
    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
      };
    
    // Return token function and token
    return {
        setToken: saveToken,
        token
    }
}