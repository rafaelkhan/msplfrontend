import React from 'react';
import Sidebar from './Sidebar';
import './General.css';



function Benutzerverwaltung() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="dashboard-content" >
                <h1>Benutzerverwaltung</h1>
            </div>
        </div>
    );
}

export default Benutzerverwaltung;