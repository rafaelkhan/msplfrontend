import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';

function Support() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar/>
            <div className="dashboard-content">
                <h1>Support</h1>
            </div>
        </div>
    );
}

export default Support;