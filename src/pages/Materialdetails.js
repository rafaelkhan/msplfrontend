import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Typography, Button, Icon, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
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
    const [entnommeneMenge, setEntnommeneMenge] = useState(0);
    const [kontingent, setKontingent] = useState(0);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('accessToken');
    let userClass = null;

    if (token) {
        const decodedToken = jwtDecode(token);
        userClass = decodedToken.userClass;
    }

    useEffect(() => {
        const fetchData = async () => {
            const materialDetailsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/BoxMaterial/materialdaten/${BoxID}`);
            setMaterialDetails(materialDetailsResponse.data[0]);
            setKontingent(materialDetailsResponse.data[0].Kontingent);

            const userRightsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/BoxMaterial/userRights/${email}`);
            setUserRights(userRightsResponse.data);

            if (userClass !== 'LEHRER') {
                const entnommeneMengeResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/BoxMaterial/entnommeneMenge/${BoxID}/${email}`);
                setEntnommeneMenge(Math.abs(entnommeneMengeResponse.data.entnommeneMenge));
            }

            if (materialDetailsResponse.data[0]) {
                const materialAttributesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/BoxMaterial/materialAttributes/${materialDetailsResponse.data[0].MaterialtypID}`);
                setMaterialAttributes(materialAttributesResponse.data);

                const entnahmeRechtResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/BoxMaterial/entnahmeRecht/${materialDetailsResponse.data[0].MaterialtypID}`);
                const berechtigteKlassen = entnahmeRechtResponse.data.map(item => item.Schulklasse);
                setIsEntnahmeBerechtigt(berechtigteKlassen.includes(userClass));
            }
        };
        fetchData();
    }, [BoxID, email, userClass]);

const handleEntnehmen = () => {
    setCurrentChange(currentChange - 1);
};

const handleDazugeben = () => {
    setCurrentChange(currentChange + 1);
};

    const handleSubmitChanges = async () => {
        if (currentChange === 0) {
            setSnackbarMessage('Keine Änderung vorgenommen');
            setSnackbarOpen(true);
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/BoxMaterial/submitChanges`, {
                BoxID,
                change: currentChange
            });
            await axios.post('${process.env.REACT_APP_API_URL}/api/user/saveAccessedChange', {
                email,
                boxID: BoxID,
                change: currentChange
            });
            setMaterialDetails(prevDetails => ({
                ...prevDetails,
                Menge: prevDetails.Menge + currentChange
            }));

            // Nach dem Aktualisieren der Daten, aktualisiere die entnommene Menge
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/BoxMaterial/entnommeneMenge/${BoxID}/${email}`);
            setEntnommeneMenge(Math.abs(response.data.entnommeneMenge));

            setSnackbarMessage(`Erfolgreich ${Math.abs(currentChange)} ${currentChange > 0 ? 'dazugegeben' : 'entnommen'}`);
            setSnackbarOpen(true);
            setCurrentChange(0); // Setze die Änderungen zurück
        } catch (error) {
            setSnackbarMessage('Fehler beim Speichern der Änderungen');
            setSnackbarOpen(true);
        }
    };

const isEntnahmeDisabled = () => {
    return materialDetails.Menge<=0 || (userClass !== 'LEHRER' && kontingent > 0 && (entnommeneMenge - currentChange >= kontingent) || !isEntnahmeBerechtigt);
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
            <p>{attrName}: /</p>;
    };

return (
    <div className="flex-container">
        <Sidebar />
        <div className="content">
            <h1 className="Titel">Materialdetails für {materialDetails ? materialDetails.Bezeichnung : '...'}</h1>
            {materialDetails && (
                <div className="buttonContainer">
                    <Typography variant="body1">Vorhandene Menge: {materialDetails.Menge}</Typography>
                    {userClass !== 'LEHRER' && kontingent > 0 && (
                        <Typography variant="body2">Maximal entnehmbar: {kontingent}</Typography>
                    )}
                    <Typography variant="body2">Ihre aktuelle Änderung: {currentChange}</Typography>
                    {['Durchmesser', 'Kraft', 'Länge', 'Stärke'].map(attrName => (
                        <Typography key={attrName} >{displayAttribute(attrName)}</Typography>
                    ))}
                    <Button variant="outlined" onClick={handleEntnehmen} disabled={isEntnahmeDisabled() || -currentChange>=materialDetails.Menge} className="button" >Entnehmen</Button>
                    <Button variant="outlined" onClick={handleDazugeben} disabled={!isEntnahmeBerechtigt || (userClass !== 'LEHRER' && !userRights.Zugabe)} className="button">Dazugeben</Button>
                    <Button variant="contained" onClick={handleSubmitChanges} color="primary" className="button">Änderungen speichern</Button>
                    <Link to="/Materialansicht">
                        <Button variant="outlined" className="button">Zurück zur Ansicht</Button>
                    </Link>
                </div>
            )}
            {!materialDetails && (
                <Typography>Lade Materialdetails...</Typography>
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
