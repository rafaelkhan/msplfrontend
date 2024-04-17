import axios from 'axios';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize();

export const signIn = async () => {
    const loginRequest = {
        scopes: ['user.read'],
    };

    try {
        sessionStorage.removeItem("msal.interaction.status")
        localStorage.removeItem('accessToken');
        localStorage.removeItem('firstName');
        const response = await msalInstance.loginPopup(loginRequest);
        const user = response.account;
        localStorage.setItem('email', user.username);

        const email = user.username;
        const preAuthPath = localStorage.getItem('preAuthPath') || '/dashboard';
        window.location.href = preAuthPath;
        localStorage.removeItem('preAuthPath');

        const fullName = user.name;
        const splitName = fullName.split(' ');
        const firstName = splitName[0];
        const lastName = splitName.length > 1 ? splitName.slice(1).join(' ') : '';

        localStorage.setItem("firstname", firstName);

        await axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, {
            email: user.username,
            firstName: firstName,
            lastName: lastName
        });

        try {
            const classResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/class`, { params: { email } });
            localStorage.setItem('accessToken', classResponse.data.accessToken);
        } catch (error) {
            console.error('Fehler beim Abrufen der Nutzerklasse', error);
        }
        
        return user;
    } catch (error) {
        console.error('An error occurred during login:', error);
        throw error;
    }
};

export const signOut = async () => {
    try {
        await msalInstance.logout();
        sessionStorage.removeItem("msal.interaction.status")
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('userClass');
        window.location.href = '/';
    } catch (error) {
        console.error('An error occurred during sign out:', error);
        throw error;
    }
};

export const isAuthenticated = () => {
    const accounts = msalInstance.getAllAccounts();
    return accounts && accounts.length > 0;
};
