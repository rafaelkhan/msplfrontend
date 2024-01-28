import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Typography, Button, Icon } from '@mui/material';
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
    const [materialAttributes, setMaterialAttributes] = useState([]);
    const [isEntnahmeBerechtigt, setIsEntnahmeBerechtigt] = useState(false);

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
        if (materialDetails.Menge != 0) {
            axios.post(`/api/BoxMaterial/updateMenge`, {
                BoxID: materialDetails.BoxID,
                Menge: materialDetails.Menge - 1
            })
                .then(response => {
                    setMaterialDetails({ ...materialDetails, Menge: materialDetails.Menge - 1 });
                })
                .catch(error => {
                    console.error('Fehler beim Entnehmen des Materials:', error);
                });
        } else {
            console.log('Die Box ist schon leer');
        }
    };

    const handleDazugeben = () => {
        axios.post(`/api/BoxMaterial/updateMenge`, {
            BoxID: materialDetails.BoxID,
            Menge: materialDetails.Menge + 1
        })
            .then(response => {
                setMaterialDetails({ ...materialDetails, Menge: materialDetails.Menge + 1 });
            })
            .catch(error => {
                console.error('Fehler beim Dazugeben des Materials:', error);
            });
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
                        <Typography variant="body1">Vorhandene Menge: {materialDetails.Menge}</Typography>
                        {['Durchmesser', 'Kraft', 'Länge', 'Stärke'].map(attrName => (
                            <Typography key={attrName} >{displayAttribute(attrName)}</Typography>
                        ))}
                        <Button variant="outlined" onClick={handleEntnehmen} disabled={!isEntnahmeBerechtigt || (userClass !== 'LEHRER' && !userRights.EntnahmeLimit)}>Entnehmen</Button>
                        <Button variant="outlined" onClick={handleDazugeben} disabled={userClass !== 'LEHRER' && !userRights.Zugabe}>Dazugeben</Button>
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
        </div>
    );
}

export default Materialdetails;
