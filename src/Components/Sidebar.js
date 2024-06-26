// Sidebar.js

import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../Assets/MSPL_Logo.jpeg';
import { signOut } from '../services/authProvider';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Sidebar.css';


function Sidebar() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    let userClass = null;
    const token = localStorage.getItem('accessToken');
    if (token) {
        const decodedToken = jwtDecode(token);
        userClass = decodedToken.userClass;
    }

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);

    };
    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/Homepage')
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };
    const handleNavigateTo = (path) => {
        console.log('Navigating to:', path);
        navigate(path);
        setIsSidebarOpen(false); // Schließe die Sidebar, wenn ein Link ausgewählt wird
    };


    return (
        <div
            style={{ width: isSidebarOpen ? '120px' : '0', transition: 'width 0.3s' }}
        >
            <div className="sidebar-header">
                <IconButton
                    className="menu-icon"
                    onClick={handleToggleSidebar}
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon />
                </IconButton>
            </div>
            <Drawer
                className="drawer"
                variant="temporary"
                anchor="left"
                open={isSidebarOpen}
                onClose={handleToggleSidebar}
                classes={{
                    paper: 'drawerPaper',
                }}
            >
                <img src={Logo} className="sidebar-logo"></img>
                <List>
                    {/* Deine Sidebar-ListItems hier */}
                    <ListItem button className="sidebar-link" onClick={() => handleNavigateTo('/Dashboard')}>
                        <ListItemText primary="MSPL" className="Text-Bar"/>
                    </ListItem>
                    <ListItem button className="sidebar-link" onClick={() => handleNavigateTo('/Materialansicht')}>
                        <ListItemText primary="Lager" className="Text-Bar"/>
                    </ListItem>
                    {userClass === 'LEHRER' && (
                    <ListItem button className="sidebar-link" onClick={() => handleNavigateTo('/Materialverwaltung')}>
                        <ListItemText primary="Material" className="Text-Bar"/>
                    </ListItem>
                    )
                    }
                    {userClass === 'LEHRER' && (
                    <ListItem button className="sidebar-link" onClick={() => handleNavigateTo('/Benutzerverwaltung')}>
                        <ListItemText primary="Benutzer/Klassen" className="Text-Bar"/>
                    </ListItem>
                    )
                    }
                    {userClass === 'LEHRER' && (
                        <ListItem button className="sidebar-link" onClick={() => handleNavigateTo('/Accessed')}>
                            <ListItemText primary="Zugriff" className="Text-Bar"/>
                        </ListItem>
                    )
                    }
                    <ListItem button className="sidebar-link" onClick={() => handleNavigateTo('/Ueberuns')}>
                        <ListItemText primary="Über uns" className="Text-Bar"/>
                    </ListItem>
                    <ListItem button className="sidebar-link" onClick={() => handleNavigateTo('/Help')}>
                        <ListItemText primary="FAQ" className="Text-Bar"/>
                    </ListItem>

                </List>
                <Button variant="outlined" color="error" className="logout-button" onClick={handleLogout}>
                    Logout
                </Button>
            </Drawer>
        </div>
    );
}

export default Sidebar;
