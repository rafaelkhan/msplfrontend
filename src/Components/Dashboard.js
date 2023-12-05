// Dashboard.js

import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-content">
                <h1>Dashboard Content</h1>
            </div>
        </div>
    );
}

export default Dashboard;
