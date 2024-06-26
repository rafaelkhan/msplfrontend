// Dashboard.js
import React from 'react';
import {Box, Paper, Typography, IconButton} from '@mui/material';
import WarehouseIcon from '@mui/icons-material/Warehouse'; // Lager Icon
import InfoIcon from '@mui/icons-material/Info'; // Über uns Icon
import HelpIcon from '@mui/icons-material/Help'; // FAQ Icon
import Sidebar from '../Components/Sidebar';
import MaterialChart from '../Components/MaterialChart';
import WelcomeMessage from '../Components/WelcomeMessage';
import {useNavigate} from 'react-router-dom';
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
    const fullname = localStorage.getItem('fullname');
    const firstname = localStorage.getItem('firstname');
    const email = localStorage.getItem('email');

    return (
        <div className="flexContainer">
            <Sidebar/>
            <div className="content">
                <h1 className="Titel">MSPL, <WelcomeMessage firstname={firstname}/></h1>
                <div className="specific-content">
                    <div className="container-wrapper">
                        <div className="container-group">
                            <div className="paperContainerViewport" onClick={() => handleNavigateTo('/Materialansicht')}>
                                <Typography variant="h6">Materialübersicht</Typography>
                                <MaterialChart/>
                            </div>
                            <div className="paperContainerLager" onClick={() => handleNavigateTo('/Materialansicht')}>
                                <WarehouseIcon className="img"/>
                                <Typography variant="h6">Lager</Typography>
                            </div>
                        </div>
                        <div className="container-group">
                            <Paper className="paperContainerUeberUns" onClick={() => handleNavigateTo('/Ueberuns')}>
                                <InfoIcon className="img"/>
                                <Typography variant="h6">Über uns</Typography>
                            </Paper>
                            <Paper className="paperContainerHelp" onClick={() => handleNavigateTo('/Help')}>
                                <HelpIcon className="img"/>
                                <Typography variant="h6">FAQ</Typography>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Dashboard;
