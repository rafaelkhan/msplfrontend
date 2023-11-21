// src/Components/Homepage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
    return (
        <div className="homepage-container">
            <h1><span className="mspl-text">MSPL</span> - Willkommen auf unserer Website</h1>
            <p>Entdecke die Welt der Bubbles.</p>
            <a href="/login">
                <button className="bubble-button">
                    <span className="arrow">&#10148;</span>
                </button>
            </a>
        </div>
    );
};

export default Homepage;
