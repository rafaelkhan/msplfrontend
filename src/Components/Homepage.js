// src/Components/Homepage.js

import React from 'react';
import './Homepage.css';
import Hase from './Login'; // Passe den Pfad an, wenn notwendig
import Logo from './Images/pngimg.com - microsoft_PNG13.png';

function Homepage(){
    return (
        <div className="homepage-container">
            <h1><span className="mspl-text">MSPL</span> - Willkommen auf unserer Website</h1>
            <p>Verwalte das Materiallager so wie du willst!</p>
            <a href="/login">
                <button className="bubble-button">
                    <img src={Logo} alt="Logo" className="microsoftlogo"></img>
                </button>
            </a>

        </div>
    );
}

export default Homepage;
