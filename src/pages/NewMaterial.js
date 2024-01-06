import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        <Container>
            <Typography variant="h4" gutterBottom>
                Neues Material hinzufügen
            </Typography>
            <form onSubmit={handleFormSubmit}>
                <TextField
                    name="MaterialtypID"
                    label="MaterialtypID"
                    variant="outlined"
                    fullWidth
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
                    margin="normal"
                    type="number"
                    value={materialData.SollBestand}
                    onChange={handleInputChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Material hinzufügen
                </Button>
                <Button variant="outlined" color="primary" onClick={handleNavigateBack}>
                    Zurück zur Materialverwaltung
                </Button>
            </form>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={snackbarMessage} />
        </Container>
    );
};

export default NewMaterial;
