import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import '../CSS/General.css';

function Accessed() {

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="content">
                <h1 className="Titel">Accessed</h1>

            </div>
        </div>
    );
}

export default Accessed;
