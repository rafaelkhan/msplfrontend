import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import '../CSS/Materialdetails.css';

const EditMaterialDialog = ({ open, handleClose, materialData, updateMaterial }) => {
    const [editedMaterial, setEditedMaterial] = useState(materialData || {});

    useEffect(() => {
        if (materialData) {
            setEditedMaterial(materialData);
        }
    }, [materialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedMaterial({ ...editedMaterial, [name]: value });
    };

    const handleSubmit = () => {
        if (materialData) {
            updateMaterial(editedMaterial);
        }
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{materialData ? `Material bearbeiten: ${materialData.Bezeichnung}` : 'Material bearbeiten'}</DialogTitle>
            <DialogContent>
                {/* Sicherstellen, dass materialData existiert, bevor auf seine Eigenschaften zugegriffen wird */}
                {materialData && (
                    <>
                        <TextField
                            name="Durchmesser"
                            label="Durchmesser in mm"
                            fullWidth
                            margin="normal"
                            value={editedMaterial.Durchmesser || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="Kraft"
                            label="Kraft in N"
                            fullWidth
                            margin="normal"
                            value={editedMaterial.Kraft || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="Länge"
                            label="Länge in mm"
                            fullWidth
                            margin="normal"
                            value={editedMaterial.Länge || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="Stärke"
                            label="Stärke in mm"
                            fullWidth
                            margin="normal"
                            value={editedMaterial.Stärke || ''}
                            onChange={handleInputChange}
                        />
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Abbrechen</Button>
                <Button onClick={handleSubmit} color="primary">Speichern</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditMaterialDialog;
