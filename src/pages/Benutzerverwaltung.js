import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, MenuItem, Paper, Select, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Sidebar from '../Components/Sidebar';
import '../CSS/Benutzerverwaltung.css';

function Benutzerverwaltung() {
    const [benutzer, setBenutzer] = useState([]);
    const [schulklassen, setSchulklassen] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedKlasse, setSelectedKlasse] = useState({});
    const [selectedVerwaltungsKlasse, setSelectedVerwaltungsKlasse] = useState('');
    const [zugabeStatus, setZugabeStatus] = useState({});
    const [entnahmeLimitStatus, setEntnahmeLimitStatus] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [neueKlasse, setNeueKlasse] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/benutzer`)
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

        axios.get(`${process.env.REACT_APP_API_URL}/api/schulklassen`)
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

        await axios.put(`${process.env.REACT_APP_API_URL}/api/benutzer/${userId}`, { schulklasse: selectedClass })
            .catch((error) => {
                console.error(error);
            });
        await axios.get(`${process.env.REACT_APP_API_URL}/api/benutzer`)
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
        await axios.get(`${process.env.REACT_APP_API_URL}/api/schulklassen`)
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
        await axios.put(`${process.env.REACT_APP_API_URL}/api/account/${userId}`, {
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
            (user.Email && user.Email.toLowerCase().includes(searchText)) ||
            (user.Vorname && user.Vorname.toLowerCase().includes(searchText)) ||
            (user.Nachname && user.Nachname.toLowerCase().includes(searchText)) ||
            (user.Schulklasse && user.Schulklasse.toLowerCase().includes(searchText))
        );
    });

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleNeueKlasseHinzufuegen = () => {
        if (!neueKlasse) return;
        await axios.post(`${process.env.REACT_APP_API_URL}/api/schulklassen`, { Schulklasse: neueKlasse })
            .then(() => {
                const aktualisierteKlassen = [...schulklassen, { Schulklasse: neueKlasse }];
                setSchulklassen(aktualisierteKlassen);
                setNeueKlasse('');
                handleClose();
            })
            .catch(error => console.error('Fehler beim Hinzufügen der Klasse:', error));
    };

    const handleKlasseLoeschen = (klasse) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/schulklassen/${klasse}`)
            .then(() => {
                setSchulklassen(schulklassen.filter(k => k.Schulklasse !== klasse));
                setSelectedVerwaltungsKlasse('');
            })
            .catch(error => console.error('Fehler beim Löschen der Klasse:', error));
    };

    return (
        <div className="body">
            <div className="flexContainer">
                <Sidebar />
                <div className="content">
                    <h1 className="titel">Benutzer</h1>
                    <div className="specific-content">
                        <Box>
                            <TextField
                                id="outlined-search"
                                label="Suche nach E-Mail, Vor- oder Nachname, oder Klasse"
                                type="search"
                                variant="outlined"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="text-field-benutzerverwaltung"
                                fullwidth
                            />
                        </Box>
                        <Paper className="paper-container-benutzerverwaltung">
                            <TableContainer component={Paper} className="table-container-benutzerverwaltung">
                                <Table>
                                    <TableHead>
                                        <TableRow className="stickyHeader">
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
                    <div className="container-klassenverwaltung">
                    <h1 className="titel-klassenverwaltung">Klassen</h1>
                    <Button className="button-hinzufügen" variant="outlined" startIcon={<EditIcon />} onClick={handleClickOpen}>
                        Neue Klasse hinzufügen
                    </Button>
                    <Dialog open={openDialog} onClose={handleClose}>
                        <DialogTitle>Neue Klasse hinzufügen</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Klassenname"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={neueKlasse}
                                onChange={(e) => setNeueKlasse(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Abbrechen</Button>
                            <Button onClick={handleNeueKlasseHinzufuegen}>Hinzufügen</Button>
                        </DialogActions>
                    </Dialog>
                    <Box>
                        <FormControl className="formControl">
                            <Select
                                value={selectedVerwaltungsKlasse}
                                onChange={(e) => setSelectedVerwaltungsKlasse(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="">
                                    <em>Klasse auswählen</em>
                                </MenuItem>
                                {schulklassen.map((klasse) => (
                                    <MenuItem key={klasse.Schulklasse} value={klasse.Schulklasse}>
                                        {klasse.Schulklasse}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            className="button-loeschen"
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleKlasseLoeschen(selectedVerwaltungsKlasse)}
                            disabled={selectedVerwaltungsKlasse === ""}
                        >
                            Löschen
                        </Button>
                    </Box>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Benutzerverwaltung;