// authConfig.js

export const msalConfig = {
    auth: {
        clientId: '032f1a6b-de8d-4902-ac46-cf2cbec78819',
        authority: 'https://login.microsoftonline.com/9a7a5a03-41c0-45dd-86a5-26d20b3ebcd5',
        redirectUri: 'https://msplfrontend.vercel.app', // Deine Rückruf-URL
        postLogoutRedirectUri: '/',
        mainWindowRedirectUri: '/',
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
    },
};
