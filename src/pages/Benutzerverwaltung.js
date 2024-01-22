import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    FormControl,Box , Select, MenuItem, TextField,
    TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper
} from '@mui/material';
import Sidebar from '../Components/Sidebar';
//import '../CSS/General.css';
import '../CSS/Benutzerverwaltung.css';


function Benutzerverwaltung() {
    const [benutzer, setBenutzer] = useState([]);
    const [schulklassen, setSchulklassen] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedKlasse, setSelectedKlasse] = useState({});

    useEffect(() => {
        // API-Anfragen, um Benutzer und Schulklasse-Daten abzurufen
        axios.get('/api/benutzer')
            .then((response) => {
                setBenutzer(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        axios.get('/api/schulklassen')
            .then((response) => {
                setSchulklassen(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleKlasseChange = (event, userId) => {
        const selectedClass = event.target.value;

        // Aktualisieren Sie den Zustand für die ausgewählte Klasse für diese Zeile
        setSelectedKlasse((prevSelected) => ({
            ...prevSelected,
            [userId]: selectedClass
        }));

        // API-Anfrage, um die ausgewählte Schulklasse für den Benutzer zu aktualisieren
        axios.put(`/api/benutzer/${userId}`, {
            schulklasse: selectedClass
        })
            .then(() => {
                // Erfolgreiche Aktualisierung
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredBenutzer = benutzer.filter((user) => {
        const searchText = searchTerm.toLowerCase();
        return (
            user.Email.toLowerCase().includes(searchText) ||
            user.Vorname.toLowerCase().includes(searchText) ||
            user.Nachname.toLowerCase().includes(searchText)
        );
    });

    return (
        <div className="body">
            <div className="flexContainer">
                <Sidebar />
                <div className="content">
                    <h1 className="Titel">Benutzerverwaltung</h1>
                    <div className="specific-content">
                        <Box>
                            <TextField
                                id="outlined-search"
                                label={`Suche nach E-Mail, Vor- oder Nachname`}
                                type="search"
                                variant="outlined"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="textField"
                            />
                        </Box>
                        <Paper className="paper-container">
                        <TableContainer component={Paper}  className="table-container">
                                <Table>
                                    <TableHead>
                                        <TableRow className="sticky-header">
                                            <TableCell>E-Mail</TableCell>
                                            <TableCell>Vorname</TableCell>
                                            <TableCell>Nachname</TableCell>
                                            <TableCell>Schulklasse</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredBenutzer.map((user) => (
                                            <TableRow key={user.NutzerID}>
                                                <TableCell>{user.Email}</TableCell>
                                                <TableCell>{user.Vorname}</TableCell>
                                                <TableCell>{user.Nachname}</TableCell>
                                                <TableCell>
                                                    <FormControl>
                                                        <Select
                                                            value={selectedKlasse[user.NutzerID] || user.Schulklasse}
                                                            onChange={(e) => handleKlasseChange(e, user.NutzerID)}
                                                        >
                                                            {schulklassen.map((klasse) => (
                                                                <MenuItem key={klasse.Schulklasse} value={klasse.Schulklasse}>
                                                                    {klasse.Schulklasse}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Benutzerverwaltung;
