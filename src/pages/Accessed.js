import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import '../CSS/Accessed.css';
import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Paper, TableContainer } from '@mui/material';
import { format } from 'date-fns';

function Accessed() {
    const [changes, setChanges] = useState([]);
    const [emailSearchTerm, setEmailSearchTerm] = useState('');
    const [dateSearchTerm, setDateSearchTerm] = useState('');

    useEffect(() => {
        axios.get('/api/user/getChanges')
            .then(response => {
                setChanges(response.data);
            })
            .catch(error => {
                console.error("Fehler beim Abrufen der Änderungsprotokolle: ", error);
            });
    }, []);

    const filteredChanges = changes.filter(change =>
        change.Email.toLowerCase().includes(emailSearchTerm.toLowerCase()) &&
        format(new Date(change.Zeitpunkt), 'dd.MM.yyyy').includes(dateSearchTerm)
    );

    return (
        <div className="flexContainer">
            <Sidebar />
            <div className="content">
                <h1 className="titel">Accessed</h1>
                <div className="specificContent">
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <TextField
                            id="email-search"
                            label="Suche nach Email"
                            type="search"
                            variant="outlined"
                            value={emailSearchTerm}
                            onChange={e => setEmailSearchTerm(e.target.value)}
                            className="textField"
                        />
                        <TextField
                            id="date-search"
                            label="Suche nach Datum"
                            type="search"
                            variant="outlined"
                            value={dateSearchTerm}
                            onChange={e => setDateSearchTerm(e.target.value)}
                            className="textField"
                        />
                    </div>
                    <Paper className="paper_container">
                        <TableContainer component={Paper} className="tableContainer">
                            <Table>
                                <TableHead>
                                    <TableRow className="stickyHeader">
                                        <TableCell>Zeitpunkt</TableCell>
                                        <TableCell>Änderung</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>BoxID</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredChanges.map((change) => (
                                        <TableRow key={change.AccessID}>
                                            <TableCell>{format(new Date(change.Zeitpunkt), 'dd.MM.yyyy HH:mm:ss')}</TableCell>
                                            <TableCell>{change.Aenderung}</TableCell>
                                            <TableCell>{change.Email}</TableCell>
                                            <TableCell>{change.BoxID}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export default Accessed;
