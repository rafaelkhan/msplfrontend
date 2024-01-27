import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    FormControl, Box, Select, MenuItem, TextField, Checkbox,
    TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper
} from '@mui/material';
import Sidebar from '../Components/Sidebar';
import '../CSS/Benutzerverwaltung.css';
import '../CSS/Sidebar.css';


function Benutzerverwaltung() {
    const [benutzer, setBenutzer] = useState([]);
    const [schulklassen, setSchulklassen] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedKlasse, setSelectedKlasse] = useState({});
    const [zugabeStatus, setZugabeStatus] = useState({});
    const [entnahmeLimitStatus, setEntnahmeLimitStatus] = useState({});

    useEffect(() => {
        axios.get('/api/benutzer')
            .then((response) => {
                setBenutzer(response.data);

                const initialZugabeStatus = {};
                const initialEntnahmeLimitStatus = {};
                response.data.forEach(user => {
                    initialZugabeStatus[user.NutzerID] = !!user.Zugabe;
                    initialEntnahmeLimitStatus[user.NutzerID] = !!user.EntnahmeLimit;
                });

                setZugabeStatus(initialZugabeStatus);
                setEntnahmeLimitStatus(initialEntnahmeLimitStatus);
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
        setSelectedKlasse((prevSelected) => ({
            ...prevSelected,
            [userId]: selectedClass
        }));

        axios.put(`/api/benutzer/${userId}`, { schulklasse: selectedClass })
            .catch((error) => {
                console.error(error);
            });
        axios.get('/api/benutzer')
            .then((response) => {
                setBenutzer(response.data);

                const initialZugabeStatus = {};
                const initialEntnahmeLimitStatus = {};
                response.data.forEach(user => {
                    initialZugabeStatus[user.NutzerID] = !!user.Zugabe;
                    initialEntnahmeLimitStatus[user.NutzerID] = !!user.EntnahmeLimit;
                });

                setZugabeStatus(initialZugabeStatus);
                setEntnahmeLimitStatus(initialEntnahmeLimitStatus);
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

    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleZugabeChange = (event, userId) => {
        const newStatus = event.target.checked;
        setZugabeStatus((prevStatus) => ({
            ...prevStatus,
            [userId]: newStatus
        }));
        updateAccount(userId, newStatus, entnahmeLimitStatus[userId]);
    };

    const handleEntnahmeLimitChange = (event, userId) => {
        const newStatus = event.target.checked;
        setEntnahmeLimitStatus((prevStatus) => ({
            ...prevStatus,
            [userId]: newStatus
        }));
        updateAccount(userId, zugabeStatus[userId], newStatus);
    };

    const updateAccount = (userId, zugabe, entnahmeLimit) => {
        axios.put(`/api/account/${userId}`, {
            zugabe: zugabe ? 1 : 0,
            entnahmeLimit: entnahmeLimit ? 1 : 0
        })
            .catch((error) => {
                console.error(error);
            });
    };

    const filteredBenutzer = benutzer.filter((user) => {
        const searchText = searchTerm.toLowerCase();
        return (
            user.Email.toLowerCase().includes(searchText) ||
            user.Vorname.toLowerCase().includes(searchText) ||
            user.Nachname.toLowerCase().includes(searchText)||
            user.Schulklasse.toLowerCase().includes(searchText)
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
                                label="Suche nach E-Mail, Vor- oder Nachname, oder Klasse"
                                type="search"
                                variant="outlined"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="textField"
                            />
                        </Box>
                        <Paper className="paper-container">
                            <TableContainer component={Paper} className="table-container">
                                <Table>
                                    <TableHead>
                                        <TableRow className="sticky-header">
                                            <TableCell>E-Mail</TableCell>
                                            <TableCell>Vorname</TableCell>
                                            <TableCell>Nachname</TableCell>
                                            <TableCell>Schulklasse</TableCell>
                                            <TableCell>Zugabe</TableCell>
                                            <TableCell>EntnahmeLimit</TableCell>
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
                                                <TableCell>
                                                    <Checkbox
                                                        checked={zugabeStatus[user.NutzerID] || false}
                                                        onChange={(e) => handleZugabeChange(e, user.NutzerID)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={entnahmeLimitStatus[user.NutzerID] || false}
                                                        onChange={(e) => handleEntnahmeLimitChange(e, user.NutzerID)}
                                                    />
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
