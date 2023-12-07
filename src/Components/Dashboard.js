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
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="dashboard-content" >
                <h1>Dashboard-Hase</h1>
            </div>
        </div>
    );
}

export default Dashboard;
