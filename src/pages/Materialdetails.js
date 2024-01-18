// Dashboard.js
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import '../CSS/General.css';

function Materialdetails() {

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="content">
                <h1 className="Titel">Materialdetails : </h1>
                </div>
            </div>
    );
}

export default Materialdetails;
