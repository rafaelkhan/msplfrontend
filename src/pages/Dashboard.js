// Dashboard.js
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import MaterialChart from '../Components/MaterialChart';
import '../CSS/General.css';

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="content">
                <h1>Dashboard</h1>
                <Paper
                    sx={{
                        p: 2,
                        borderRadius: 4,
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: '#f1f1f1',
                        },
                        width: 'fit-content',
                    }}
                >
                    <Typography variant="h6">Materialübersicht</Typography>
                    <MaterialChart />
                </Paper>
            </div>
        </div>
    );
}

export default Dashboard;
