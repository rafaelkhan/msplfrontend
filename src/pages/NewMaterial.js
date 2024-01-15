import React, { useState } from 'react';
import {Paper, Button, TextField, Container, Typography, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Components/Sidebar'
import '../CSS/General.css';

const NewMaterial = () => {
    const [materialData, setMaterialData] = useState({
        MaterialtypID: '',
        Bezeichnung: '',
        SollBestand: 0,
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
                    MaterialtypID: materialData.MaterialtypID,
                    Bezeichnung: materialData.Bezeichnung,
                },
            });

            if (checkDuplicateResponse.data.duplicate) {
                setSnackbarMessage('MaterialtypID or Bezeichnung already exists');
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
                        name="MaterialtypID"
                        label="MaterialtypID"
                        variant="outlined"
                        sx={{width:'80%'}}
                        margin="normal"
                        type="text"
                        value={materialData.MaterialtypID}
                        onChange={handleInputChange}
                        required
                    />
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
