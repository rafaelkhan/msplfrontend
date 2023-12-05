// Homepage.js
import React from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';
import Logo from './Images/pngimg.com - microsoft_PNG13.png';

function Homepage() {
    return (
        <div className="homepage-container">
            <h1><span className="mspl-text">MSPL</span> - Materialverwaltung</h1>
            <p>Logge dich dafür mit deinem Microsoft Account ein</p>
            <Link to="/Login">
                <button className="bubble-button">
                    <img src={Logo} alt="Logo" className="microsoftlogo" />
                </button>
            </Link>
        </div>
    );
}

export default Homepage;
