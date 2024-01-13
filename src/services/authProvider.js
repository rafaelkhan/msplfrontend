// authProvider.js
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
        const response = await msalInstance.loginPopup(loginRequest);
        const user = response.account;

        try {
            const email = user.username;
            const classResponse = await axios.get('/api/user/class', { params: { email } });
            localStorage.setItem('accessToken', classResponse.data.accessToken);
        } catch (error) {
            console.error('Fehler beim Abrufen der Nutzerklasse', error);
            // Optional: Handhabung des Fehlers oder Festlegen eines Standardwerts
        }

        window.location.href = '/Dashboard';

        // Aufteilen des Namens in Vor- und Nachname
        const fullName = user.name;
        const splitName = fullName.split(' ');
        const firstName = splitName[0];
        const lastName = splitName.length > 1 ? splitName.slice(1).join(' ') : '';

        // Senden der Daten an das Backend mit Axios
        await axios.post('/api/user/login', {
            email: user.username,
            firstName: firstName,
            lastName: lastName
        });

        return user;
    } catch (error) {
        console.error('An error occurred during login:', error);
        throw error;
    }
};

export const signOut = async () => {
    try {
        await msalInstance.logout();
        // Nach dem Abmelden zur Homepage weiterleiten;
        sessionStorage.removeItem("msal.interaction.status")
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('userClass')
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
