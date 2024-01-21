import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import axios from 'axios'; // Angenommen, du verwendest axios für API-Aufrufe
//import '../CSS/General.css';
import '../CSS/Materialdetails.css';


function Materialdetails() {
    const { BoxID } = useParams();
    const [materialDetails, setMaterialDetails] = useState(null);

    useEffect(() => {
        axios.get(`/api/BoxMaterial/materialdaten/${BoxID}`)
            .then(response => {
                console.log(response.data); // Sicherstellen, dass dies das erwartete Objekt ist
                setMaterialDetails(response.data[0]); // Zugriff auf das erste Element, falls die Antwort ein Array ist
            })
            .catch(error => {
                console.error('Fehler beim Abrufen der Materialdetails:', error);
            });
    }, [BoxID]);

    return (
        <div className="flex-container">
            <Sidebar />
            <div className="content">
                <h1 className="Titel">Materialdetails für {materialDetails ? materialDetails.Bezeichnung : '...'}</h1>
                {materialDetails ? (
                    <Paper className="material-Data">
                        <Typography variant="h6">{materialDetails.Bezeichnung}</Typography>
                        {/* Weitere Details anzeigen */}
                        <Typography variant="body1">Menge: {materialDetails.Menge}</Typography>
                        {/* Weitere Informationen hinzufügen, falls nötig */}
                    </Paper>
                ) : (
                    <Typography>Lade Materialdetails...</Typography>
                )}
            </div>
        </div>
    );
}

export default Materialdetails;
