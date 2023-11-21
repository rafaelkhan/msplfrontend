// AuthProvider.js

import { Configuration, PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import React from 'react';

const msalConfig = {
    auth: {
        clientId: '',
        authority: 'DEINE_AUTHORITY',
        redirectUri: 'http://localhost:3000', // Deine lokale Adresse
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
};

const msalInstance = new PublicClientApplication(msalConfig);

const AuthProvider = ({ children }) => {
    return (
        <MsalProvider instance={msalInstance}>
            {children}
        </MsalProvider>
    );
};

export default AuthProvider;
