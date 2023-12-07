import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';

function Materialverwaltung() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="dashboard-content" >
                <h1>Materialverwaltung</h1>
            </div>
        </div>
    );
}

export default Materialverwaltung;