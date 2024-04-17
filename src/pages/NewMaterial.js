import React, {useState, useEffect} from 'react';
import {Button, TextField, FormControl, InputLabel, Select, MenuItem, Snackbar} from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import '../CSS/NewMaterial.css';

const NewMaterial = () => {
    const [materialData, setMaterialData] = useState({
        Bezeichnung: '',
        SollBestand: 0,
        Durchmesser: '',
        Kraft: '',
        Länge: '',
        Stärke: ''
    });
    const [selectedBox, setSelectedBox] = useState('');
    const [occupiedBoxes, setOccupiedBoxes] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/Materialtyp/occupiedBoxes`)
            .then(response => {
                setOccupiedBoxes(response.data);
            })
            .catch(error => console.error('Fehler beim Abrufen besetzter Boxen:', error));
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setMaterialData({...materialData, [name]: value});
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const checkDuplicateResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/Materialtyp/check-duplicate`, {params: {Bezeichnung: materialData.Bezeichnung}});
            if (checkDuplicateResponse.data.duplicate) {
                setSnackbarMessage('Bezeichnung already exists');
                setSnackbarOpen(true);
            } else {
                const materialWithBox = {...materialData, BoxID: selectedBox, Menge: 0};
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/Materialtyp/create`, materialWithBox);
                if (response.status === 201) {
                    setSnackbarMessage('Material erfolgreich hinzugefügt');
                    setSnackbarOpen(true);

                    setTimeout(() => {
                        handleNavigateBack();
                    }, 1000);
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
        <div style={{display: 'flex'}}>
            <Sidebar/>
            <div className="content">
                <h1 className="itel">Neues Material hinzufügen</h1>
                <form onSubmit={handleFormSubmit}>
                    <TextField name="Bezeichnung" label="Bezeichnung" variant="outlined" className="eingabe"
                               margin="normal" value={materialData.Bezeichnung} onChange={handleInputChange} required/>
                    <TextField name="SollBestand" label="Soll-Bestand" variant="outlined" className="eingabe"
                               margin="normal" type="number" value={materialData.SollBestand}
                               onChange={handleInputChange} required/>
                    <TextField name="Durchmesser" label="Durchmesser in mm" variant="outlined" className="eingabe"
                               margin="normal" value={materialData.Durchmesser} onChange={handleInputChange}/>
                    <TextField name="Kraft" label="Kraft in N" variant="outlined" className="eingabe" margin="normal"
                               value={materialData.Kraft} onChange={handleInputChange}/>
                    <TextField name="Länge" label="Länge in mm" variant="outlined" className="eingabe" margin="normal"
                               value={materialData.Länge} onChange={handleInputChange}/>
                    <TextField name="Stärke" label="Stärke in mm" variant="outlined" className="eingabe" margin="normal"
                               value={materialData.Stärke} onChange={handleInputChange}/>
                    <FormControl fullWidth className="selectBox" margin="normal">
                        <InputLabel id="box-select-label" required>Box</InputLabel>
                        <Select labelId="box-select-label" id="box-select" value={selectedBox} label="Box"
                                onChange={(e) => setSelectedBox(e.target.value)}>
                            {Array.from({length: 208}, (_, i) => i + 1).map((boxId) => (
                                <MenuItem key={boxId} value={boxId} disabled={occupiedBoxes.includes(boxId)}>
                                    {`Box ${boxId}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div>
                        <Button type="submit" variant="contained" color="primary" className="materialHinzufuegen">Material
                            hinzufügen</Button>
                        <Button variant="outlined" color="primary" onClick={handleNavigateBack} className="zurueck">Zurück
                            zur Materialverwaltung</Button>
                    </div>
                </form>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}
                          message={snackbarMessage}/>
            </div>
        </div>
    );
};

export default NewMaterial;