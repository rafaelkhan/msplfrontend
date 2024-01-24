    import React, { useState, useEffect } from 'react';
    import { useParams } from 'react-router-dom';
    import { Box, Paper, Typography, Button } from '@mui/material';
    import { Link } from 'react-router-dom';
    import Sidebar from '../Components/Sidebar';
    import axios from 'axios';
    import { jwtDecode } from 'jwt-decode';
    import '../CSS/Materialdetails.css';

    function Materialdetails() {
        const { BoxID } = useParams();
        const [materialDetails, setMaterialDetails] = useState(null);
        const [userRights, setUserRights] = useState({});
        const [materialAttributes, setMaterialAttributes] = useState([]);

        const email = localStorage.getItem('email');
        const token = localStorage.getItem('accessToken');
        let userClass = null;

        if (token) {
            const decodedToken = jwtDecode(token);
            userClass = decodedToken.userClass;
        }

        useEffect(() => {
            axios.get(`/api/BoxMaterial/materialdaten/${BoxID}`)
                .then(response => {
                    setMaterialDetails(response.data[0]);
                })
                .catch(error => {
                    console.error('Fehler beim Abrufen der Materialdetails:', error);
                });

            axios.get(`/api/BoxMaterial/userRights/${email}`)
                .then(response => {
                    setUserRights(response.data);
                })
                .catch(error => {
                    console.error('Fehler beim Abrufen der Nutzerrechte:', error);
                });

            if (materialDetails) {
                axios.get(`/api/BoxMaterial/materialAttributes/${materialDetails.MaterialtypID}`)
                    .then(response => {
                        setMaterialAttributes(response.data);
                    })
                    .catch(error => {
                        console.error('Fehler beim Abrufen der Materialattribute:', error);
                    });
            }
        }, [BoxID, email, materialDetails]);

        return (
            <div className="flex-container">
                <Sidebar />
                <div className="content">
                    <h1 className="Titel">Materialdetails für {materialDetails ? materialDetails.Bezeichnung : '...'}</h1>
                    {materialDetails ? (
                        <Paper className="material-Data">
                            <Typography variant="body1">Vorhandene Menge: {materialDetails.Menge}</Typography>
                            {materialAttributes.map(attr => (
                                <Typography key={attr.AttributName}>{attr.AttributName}: {attr.Quantitaet}</Typography>
                            ))}
                            {userClass === 'Lehrer' || (userRights.Zugabe && userRights.EntnahmeLimit) ? (
                                <>
                                    <Button variant="outlined">Entnehmen</Button>
                                    <Button variant="outlined">Dazugeben</Button>
                                </>
                            ) : null}
                        </Paper>
                    ) : (
                        <div>
                            <Typography>Lade Materialdetails...</Typography>
                            <Link to="/Materialansicht">
                                <Button variant="outlined">
                                    Zurück zur Ansicht
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    export default Materialdetails;
