// Sidebar.js

import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarToggle = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleSidebarToggle}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={isSidebarOpen}
                onClose={handleSidebarToggle}
            >
                <List>
                    <ListItem button component={Link} to="/dashboard">
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    {/* Weitere ListItems für zusätzliche Seiten */}
                </List>
            </Drawer>
        </div>
    );
}

export default Sidebar;
