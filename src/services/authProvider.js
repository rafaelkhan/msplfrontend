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
        sessionStorage.clear();
        const response = await msalInstance.loginPopup(loginRequest);
        return response.account;
    } catch (error) {
        console.error('An error occurred during login:', error);
        throw error;
    }
};

export const signOut = async () => {
    try {
        await msalInstance.logout();
    } catch (error) {
        console.error('An error occurred during sign out:', error);
        throw error;
    }

    // Nach dem Abmelden zur Homepage weiterleiten
    window.location.href = '/';
};
