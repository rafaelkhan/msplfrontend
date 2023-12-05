// Dashboard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Dashboard.css';
import { signOut } from './authProvider';

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/Homepage');
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-content">
                <h1>Dashboard Content</h1>

                {/* Hier ist der Logout-Button */}
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
