import React, { useState } from 'react';
import {Paper, Button, TextField, Container, Typography, Snackbar } from '@mui/material';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Components/Sidebar'
import '../CSS/General.css';

const NewMaterial = () => {
    const [materialData, setMaterialData] = useState({
        Bezeichnung: '',
        SollBestand: 0,

        Durchmesser: '',
        Kraft: '',
        Länge: '',
        Stärke: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMaterialData({ ...materialData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const checkDuplicateResponse = await axios.get('/api/Materialtyp/check-duplicate', {
                params: {
                    Bezeichnung: materialData.Bezeichnung,
                },
            });

            if (checkDuplicateResponse.data.duplicate) {
                setSnackbarMessage('Bezeichnung already exists');
                setSnackbarOpen(true);
            } else {
                const response = await axios.post('/api/Materialtyp/create', materialData);

                if (response.status === 201) {
                    setSnackbarMessage('Material erfolgreich hinzugefügt');
                    setSnackbarOpen(true);
                    // Optional: Redirect to the materialverwaltung page
                    // navigate('/materialverwaltung');
                } else {
                    console.error('Fehler beim Hinzufügen des Materials');
                }
            }
        } catch (error) {
            console.error('Fehler beim Hinzufügen des Materials', error);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleNavigateBack = () => {
        navigate('/materialverwaltung');
    };

    return (
        <div style={{ display: 'flex'}}>
            <Sidebar/>
            <div className="content">
                <h1 className="Titel">
                    Neues Material hinzufügen
                </h1>
                <form onSubmit={handleFormSubmit}>
                    <TextField
                        name="Bezeichnung"
                        label="Bezeichnung"
                        variant="outlined"
                        fullWidth
                        sx={{width:'80%'}}
                        margin="normal"
                        value={materialData.Bezeichnung}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        name="SollBestand"
                        label="Soll-Bestand"
                        variant="outlined"
                        fullWidth
                        sx={{width:'80%'}}
                        margin="normal"
                        type="number"
                        value={materialData.SollBestand}
                        onChange={handleInputChange}
                        required
                    />
                    <Paper sx={{ width: '80%', overflow: 'hidden' }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                <TableCell>Attribute</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        name="Durchmesser"
                                        label="Durchmesser"
                                        variant="outlined"
                                        fullWidth
                                        sx={{width:'80%'}}
                                        margin="normal"
                                        value={materialData.Durchmesser}
                                        onChange={handleInputChange}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        name="Kraft"
                                        label="Kraft"
                                        variant="outlined"
                                        fullWidth
                                        sx={{width:'80%'}}
                                        margin="normal"
                                        value={materialData.Kraft}
                                        onChange={handleInputChange}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        name="Länge"
                                        label="Länge"
                                        variant="outlined"
                                        fullWidth
                                        sx={{width:'80%'}}
                                        margin="normal"
                                        value={materialData.Länge}
                                        onChange={handleInputChange}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        name="Stärke"
                                        label="Stärke"
                                        variant="outlined"
                                        fullWidth
                                        sx={{width:'80%'}}
                                        margin="normal"
                                        value={materialData.Stärke}
                                        onChange={handleInputChange}
                                    />
                                </TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Paper>
                    <div style={{ display: 'flex', width: '80%'}}>
                        <Button type="submit" variant="contained" color="primary">
                            Material hinzufügen
                        </Button>
                        <Button variant="outlined" color="primary" onClick={handleNavigateBack}>
                            Zurück zur Materialverwaltung
                        </Button>
                    </div>
                </form>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={snackbarMessage} />
            </div>
        </div>
    );
};

export default NewMaterial;
