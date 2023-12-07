import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';



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