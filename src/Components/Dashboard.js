// Dashboard.js

import React from 'react';
import Sidebar from './Sidebar';
import Button from '@mui/material/Button';
import { signOut } from './authProvider';
import './Dashboard.css';

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = async () => {
        try {
            await signOut();
            // navigate('/Homepage'); // Je nach Bedarf
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="dashboard-content" >
                <h1>Dashboard</h1>
            </div>
        </div>
    );
}

export default Dashboard;
