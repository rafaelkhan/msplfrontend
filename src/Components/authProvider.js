// authProvider.js
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize();

export const signIn = async () => {
    const loginRequest = {
        scopes: ['user.read'],
    };

    try {
        const response = await msalInstance.loginPopup(loginRequest);
        return response.account;
    } catch (error) {
        console.error('An error occurred during login:', error);
        throw error;
    }
};

export const signOut = () => {
    msalInstance.logout();
};
