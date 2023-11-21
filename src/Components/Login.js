// Login.js

import React from 'react';
import { useMsal } from '@azure/msal-react';
import './Homepage.css';

const Login = () => {
    const { instance, accounts } = useMsal();

    const handleLogin = async () => {
        try {
            // Prüfe, ob ein Benutzer bereits angemeldet ist
            const response = await instance.handleRedirectPromise();
            if (response && response.account) {
                // Der Benutzer ist bereits angemeldet
                console.log('Benutzer ist bereits angemeldet:', response.account);
            } else {
                // Wenn der Benutzer nicht angemeldet ist, starte die Anmeldung
                await instance.loginRedirect();
            }
        } catch (error) {
            console.error('Fehler bei der Anmeldung:', error);
        }
    };

    return (
        <div>
            <p>Nicht angemeldet</p>
            <button onClick={handleLogin}>Anmelden mit Microsoft</button>
        </div>
    );
};

export default Login;
