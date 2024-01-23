// Homepage.js
import React from 'react';
import '../CSS/Homepage.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'
import axios from 'axios';
import Logo from '../Assets/pngimg.com - microsoft_PNG13.png';
import { signIn } from '../services/authProvider'; // Importiere MSAL-Funktionen

function Homepage() {
    const navigate = useNavigate();
    const handleSignIn = async () => {
        try {
            console.log('Attempting sign in...')
            await signIn();
            console.log('Sign in successful');
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    };

    return (
        <div className="homepage-container">
            <h1><span className="mspl-text">MSPL</span> - Materialverwaltung</h1>
            <p>Logge dich dafür mit deinem Microsoft Account ein</p>
            <button className="bubble-button" onClick={handleSignIn}>
                <img src={Logo} alt="Logo" className="microsoftlogo" />
            </button>
        </div>
    );
}

export default Homepage;
