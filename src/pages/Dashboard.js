// Dashboard.js
import React from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import WarehouseIcon from '@mui/icons-material/Warehouse'; // Lager Icon
import InfoIcon from '@mui/icons-material/Info'; // Über uns Icon
import HelpIcon from '@mui/icons-material/Help'; // FAQ Icon
import Sidebar from '../Components/Sidebar';
import MaterialChart from '../Components/MaterialChart';
import WelcomeMessage from '../Components/WelcomeMessage';
import { useNavigate } from 'react-router-dom';
import '../CSS/Dashboard.css';

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleNavigateTo = (path) => {
        navigate(path);
    };
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
                <h1 className="Titel">MSPL</h1>
                <WelcomeMessage firstname={firstname} />

                <div className="specific-content">
                    <Paper className="paperContainer">
                        <Typography variant="h6">Materialübersicht</Typography>
                        <MaterialChart />
                    </Paper>

                    <Paper className="paperContainer" onClick={() => handleNavigateTo('/Materialansicht')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <WarehouseIcon sx={{fontSize: "300px"}}/>
                        <Typography variant="h6">Lager</Typography>
                    </Paper>

                    <Paper className="paperContainer" onClick={() => handleNavigateTo('/Ueberuns')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <InfoIcon sx={{fontSize: "300px"}}/>
                        <Typography variant="h6">Über uns</Typography>
                    </Paper>
                    <Paper className="paperContainer" onClick={() => handleNavigateTo('/Help')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                            <HelpIcon sx={{fontSize: "300px"}}/>

                        <Typography variant="h6">FAQ</Typography>
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
