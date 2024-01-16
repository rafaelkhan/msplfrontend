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
    const name=localStorage.getItem('Name');
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="content">
                <h1 className="Titel">Dashboard {name}</h1>
                <div className="specific-content">
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
        </div>
    );
}

export default Dashboard;
