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
        axios.get(`${process.env.REACT_APP_API_URL}/api/user/getChanges`)
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
                <h1 className="titel">Zugriff</h1>
                <div>

                        <TextField
                            id="email-search"
                            label="Suche nach Email"
                            type="search"
                            variant="outlined"
                            value={emailSearchTerm}
                            onChange={e => setEmailSearchTerm(e.target.value)}
                            className="text-field-button-accessed"
                        />
                        <TextField
                            id="date-search"
                            label="Suche nach Datum"
                            type="search"
                            variant="outlined"
                            value={dateSearchTerm}
                            onChange={e => setDateSearchTerm(e.target.value)}
                            className="text-field-button-accessed"
                        />

                    <Paper className="paper-container-accessed">
                        <TableContainer component={Paper} className="table-container-accessed">
                            <Table>
                                <TableHead>
                                    <TableRow className="stickyHeader-accessed">
                                        <TableCell>Zeitpunkt</TableCell>
                                        <TableCell>Änderung</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>BoxID</TableCell>
                                        <TableCell>Materialtyp</TableCell> {/* Neue Spalte hinzugefügt */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredChanges.map((change) => (
                                        <TableRow key={change.AccessID}>
                                            <TableCell>{format(new Date(change.Zeitpunkt), 'dd.MM.yyyy HH:mm:ss')}</TableCell>
                                            <TableCell>{change.Aenderung}</TableCell>
                                            <TableCell>{change.Email}</TableCell>
                                            <TableCell>{change.BoxID}</TableCell>
                                            <TableCell>{change.Bezeichnung}</TableCell> {/* Daten anzeigen */}
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
