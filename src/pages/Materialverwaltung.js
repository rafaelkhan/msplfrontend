import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
    Paper, TextField, Box, Button, IconButton, Input, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../Components/Sidebar';

function Materialverwaltung() {
    const [materialien, setMaterialien] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [bestaende, setBestaende] = useState({});
    const [occupiedBoxes, setOccupiedBoxes] = useState([]);
    const [boxAssignments, setBoxAssignments] = useState({});

    useEffect(() => {
        axios.get('/api/Materialtyp').then(response => {
            setMaterialien(response.data);
        }).catch(error => console.error('Fehler beim Abrufen der Materialdaten:', error));

        axios.get('/api/Materialtyp/Box').then(response => {
            const bestandObj = {};
            const initialBoxAssignments = {};
            response.data.forEach(box => {
                bestandObj[box.MaterialtypID] = box.Menge;
                initialBoxAssignments[box.MaterialtypID] = box.BoxID;
            });
            setBestaende(bestandObj);
            setBoxAssignments(initialBoxAssignments);
        }).catch(error => console.error('Fehler beim Abrufen des aktuellen Bestands:', error));

        axios.get('/api/Materialtyp/occupiedBoxes').then(response => {
            setOccupiedBoxes(response.data);
        }).catch(error => console.error('Fehler beim Abrufen besetzter Boxen:', error));
    }, []);

    const deleteMaterial = async (id) => {
        await axios.delete(`/api/Materialtyp/delete/${id}`);
        const response = await axios.get('/api/Materialtyp');
        setMaterialien(response.data);
    };

    const updateTargetStock = async (materialId, newTargetStock) => {
        await axios.put(`/api/Materialtyp/${materialId}/updateTargetStock`, { newTargetStock });
        const response = await axios.get('/api/Materialtyp');
        setMaterialien(response.data);
    };

    const updateBoxStock = async (materialtypId, newStock) => {
        const response = await axios.put(`/api/Materialtyp/Box/updateStock`, { materialtypId, newStock });
        if (response.status === 200) {
            setBestaende(prevBestaende => ({
                ...prevBestaende,
                [materialtypId]: parseInt(newStock)
            }));
        }
    };

    const updateBoxAssignment = (materialId, newBoxId) => {
        setBoxAssignments(prev => ({ ...prev, [materialId]: newBoxId }));
        axios.put('/api/Materialtyp/updateBoxAssignment', { materialtypId: materialId, boxId: newBoxId })
            .then(response => console.log('Box-Zuweisung erfolgreich aktualisiert'))
            .catch(error => console.error('Fehler beim Aktualisieren der Box-Zuweisung', error));
        axios.get('/api/Materialtyp/occupiedBoxes').then(response => {
            setOccupiedBoxes(response.data);
        }).catch(error => console.error('Fehler beim Abrufen besetzter Boxen:', error));
    };

    const handleStockChange = (materialId, newValue, updateFunction) => {
        if (newValue !== "") {
            updateFunction(materialId, newValue);
        }
    };

    const handleKeyDown = (event, materialId, updateFunction) => {
        if (event.key === 'Enter') {
            handleStockChange(materialId, event.target.value, updateFunction);
            event.target.blur();
        }
    };

    const filteredMaterialien = materialien.filter(material =>
        material.Bezeichnung.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.MaterialtypID.toString().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="body">
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div className="content">
                    <h1 className="Titel">Materialverwaltung</h1>
                    <div className="specific-content">
                        <Box sx={{ width: '80%', marginTop: '16px' }}>
                            <TextField
                                id="outlined-search"
                                label="Suche nach Name oder ID"
                                type="search"
                                variant="outlined"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                sx={{ width: '100%' }}
                            />
                        </Box>
                        <Box sx={{ width: '80%' }}>
                            <Link to="/newmaterial">
                                <Button sx={{ width: '100%', height: '55px'}} variant="outlined" color="secondary">
                                    Neues Material hinzufügen
                                </Button>
                            </Link>
                        </Box>
                        <Paper sx={{ width: '80%', overflow: 'hidden' }}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>Soll-Bestand</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>Aktueller Bestand</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>Box</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>Löschen</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredMaterialien.map(material => (
                                            <TableRow key={material.MaterialtypID}>
                                                <TableCell>{material.MaterialtypID}</TableCell>
                                                <TableCell>{material.Bezeichnung}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <Input
                                                        type="number"
                                                        defaultValue={material.SollBestand}
                                                        onBlur={(e) => handleStockChange(material.MaterialtypID, e.target.value, updateTargetStock)}
                                                        onKeyDown={(e) => handleKeyDown(e, material.MaterialtypID, updateTargetStock)}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <Input
                                                        key={material.MaterialtypID + '-' + (bestaende[material.MaterialtypID] || 0)}
                                                        type="number"
                                                        defaultValue={bestaende[material.MaterialtypID] || 0}
                                                        onBlur={(e) => handleStockChange(material.MaterialtypID, e.target.value, updateBoxStock)}
                                                        onKeyDown={(e) => handleKeyDown(e, material.MaterialtypID, updateBoxStock)}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <FormControl fullWidth>
                                                        <Select
                                                            value={boxAssignments[material.MaterialtypID] || ''}
                                                            onChange={(e) => updateBoxAssignment(material.MaterialtypID, e.target.value)}
                                                        >
                                                            {Array.from({ length: 64 }, (_, i) => i + 1).map(boxId => (
                                                                <MenuItem key={boxId} value={boxId} disabled={occupiedBoxes.includes(boxId) && boxAssignments[material.MaterialtypID] !== boxId}>
                                                                    {`Box ${boxId}`}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <IconButton onClick={() => deleteMaterial(material.MaterialtypID)}>
                                                        <DeleteIcon />
                                                    </IconButton>
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

export default Materialverwaltung;
