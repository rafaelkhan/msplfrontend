// src/Components/Homepage.js

import React from 'react';
import './Homepage.css';
import Hase from './Login'; // Passe den Pfad an, wenn notwendig


function Homepage(){
    return (
        <div className="homepage-container">
            <h1><span className="mspl-text">MSPL</span> - Willkommen auf unserer Website</h1>
            <p>Verwalte das Materiallager so wie du willst!</p>
            <a href="/login">
                <button className="bubble-button">
                    <span className="arrow">&#10148;</span>
                </button>
            </a>
            <Hase/>
        </div>
    );
}

export default Homepage;
