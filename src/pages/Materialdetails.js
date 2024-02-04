import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Typography, Button, Icon, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import '../CSS/Materialdetails.css';

function Materialdetails() {
    const { BoxID } = useParams();
    const [materialDetails, setMaterialDetails] = useState(null);
    const [userRights, setUserRights] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [materialAttributes, setMaterialAttributes] = useState([]);
    const [isEntnahmeBerechtigt, setIsEntnahmeBerechtigt] = useState(false);
    const [currentChange, setCurrentChange] = useState(0);

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

            axios.get(`/api/BoxMaterial/entnahmeRecht/${materialDetails.MaterialtypID}`)
                .then(response => {
                    const berechtigteKlassen = response.data.map(item => item.Schulklasse);
                    setIsEntnahmeBerechtigt(berechtigteKlassen.includes(userClass));
                })
                .catch(error => {
                    console.error('Fehler beim Abrufen der Entnahmeberechtigungen:', error);
                });
        }
    }, [BoxID, email, materialDetails]);

    const handleEntnehmen = () => {
        setCurrentChange(currentChange - 1);
    };

    const handleDazugeben = () => {
        setCurrentChange(currentChange + 1);
    };

    const handleSubmitChanges = async () => {
        try {
            const saveChangesResponse = await axios.post(`/api/BoxMaterial/submitChanges`, {
                BoxID,
                change: currentChange
            });

            if (saveChangesResponse.status === 200) {
                await axios.post('/api/user/saveAccessedChange', {
                    email,
                    boxID: BoxID,
                    change: currentChange
                });

                setMaterialDetails(prevDetails => ({
                    ...prevDetails,
                    Menge: prevDetails.Menge
                }));
                setSnackbarMessage(`Erfolgreich ${Math.abs(currentChange)} ${currentChange > 0 ? 'dazugegeben' : 'entnommen'}`);
                setSnackbarOpen(true);
                setCurrentChange(0);
            }
        } catch (error) {
            console.error('Fehler beim Speichern der Änderungen:', error);
            // Update snackbar message to show error
            setSnackbarMessage('Fehler beim Speichern der Änderungen');
            setSnackbarOpen(true);
        }
    };

    const displayAttribute = (attrName) => {
        const attr = materialAttributes.find(attr => attr.AttributName === attrName);
        let after = '';
        switch (attrName) {
            case 'Durchmesser':
                after = 'mm';
                break;
            case 'Kraft':
                after = 'N';
                break;
            case 'Länge':
                after = 'mm';
                break;
            case 'Stärke':
                after = 'mm';
                break;
        }
        return attr ?
            <p>{attr.AttributName}: {attr.Quantitaet} {after}</p> :
            <p>{attrName}: <NotInterestedIcon className="icon-align" /></p>;
    };

    return (
        <div className="flex-container">
            <Sidebar />
            <div className="content">
                <h1 className="Titel">Materialdetails für {materialDetails ? materialDetails.Bezeichnung : '...'}</h1>
                {materialDetails ? (
                    <div>
                        <Typography variant="body1">Vorhandene Menge: {materialDetails ? materialDetails.Menge : 'Lädt...'}</Typography>
                        <Typography variant="body2">Ihre aktuelle Änderung: {currentChange > 0 ? `+${currentChange}` : currentChange}</Typography>
                        {['Durchmesser', 'Kraft', 'Länge', 'Stärke'].map(attrName => (
                            <Typography key={attrName} >{displayAttribute(attrName)}</Typography>
                        ))}
                        <Button variant="outlined" onClick={handleEntnehmen} disabled={!isEntnahmeBerechtigt || (userClass !== 'LEHRER' && !userRights.EntnahmeLimit)}>Entnehmen</Button>
                        <Button variant="outlined" onClick={handleDazugeben} disabled={userClass !== 'LEHRER' && !userRights.Zugabe}>Dazugeben</Button>
                        <Button variant="contained" onClick={handleSubmitChanges} color="primary" disabled={(!isEntnahmeBerechtigt || (userClass !== 'LEHRER' && !userRights.EntnahmeLimit)) && (userClass !== 'LEHRER' && !userRights.Zugabe)}>Änderungen speichern</Button>
                    </div>
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
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </div>
    );
}

export default Materialdetails;
