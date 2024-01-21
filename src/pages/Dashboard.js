// Dashboard.js
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import MaterialChart from '../Components/MaterialChart';
//import WelcomeMessage from '../Components/WelcomeMessage';
import '../CSS/Dashboard.css';

// statt dem  <h2 className="name-Wilkommen">Willkommen {firstname}.</h2> <WelcomeMessage firstname={firstname} />

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const fullname=localStorage.getItem('fullname');
    const firstname=localStorage.getItem('firstname');
    const email=localStorage.getItem('email');
    return (
        <div className="flexContainer">
            <Sidebar />
            <div className="content">
                <h1 className="Titel">Dashboard</h1>
                <h2 className="name-Wilkommen">Willkommen {firstname}.</h2>
                <div className="specific-content">
                    <Paper className="paperContainer">
                        <Typography variant="h6">Materialübersicht</Typography>
                        <MaterialChart />
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
