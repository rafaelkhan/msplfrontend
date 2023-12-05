import React from 'react';
import styled from 'styled-components';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import Logo from './Images/MSPL_Logo.jpeg';

const SidebarContainer = styled.div`
    width: ${({ isHovered }) => (isHovered ? '240px' : '0')};
    transition: width 0.3s;
`;

const Sidebar = () => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <SidebarContainer
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            isHovered={isHovered}
        >
            <Drawer
                className="drawer"
                variant="temporary"
                anchor="left"
                open={isHovered}
                onClose={() => setIsHovered(false)}
                classes={{
                    paper: 'drawerPaper',
                }}
            >
                <List>
                    <ListItem button className="sidebar-link">
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    {/* Weitere ListItems für andere Seiten */}
                </List>
            </Drawer>
        </SidebarContainer>
    );
};

export default Sidebar;
