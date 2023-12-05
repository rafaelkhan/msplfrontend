// Sidebar.js

import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './Images/MSPL_Logo.jpeg';
import './Sidebar.css';

function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
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
                    <ListItem button className="sidebar-link">
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}

export default Sidebar;
