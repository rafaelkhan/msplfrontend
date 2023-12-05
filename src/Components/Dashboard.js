// Dashboard.js
import React from 'react';
import Sidebar from './Sidebar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1, padding: '20px', marginLeft: '0px' }}>
                <h1>Dashboard</h1>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Cell 1</TableCell>
                                <TableCell>Cell 2</TableCell>
                            </TableRow>
                            {/* Füge weitere Tabellenzeilen hinzu */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default Dashboard;
