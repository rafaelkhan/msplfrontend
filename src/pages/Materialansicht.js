import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import BoxGrid from '../Components/BoxGrid';
import '../CSS/General.css';
import '../CSS/BoxComponent.css';

function Materialansicht() {
    const [boxes, setBoxes] = useState([]);

    useEffect(() => {
        axios.get('/api/BoxMaterial/boxes')
            .then((response) => {
                const fullArray = new Array(208).fill(null).map((item, index) => {
                    return response.data.find(box => box.BoxID === index + 1) || { BoxID: index + 1, Menge: 0 };
                });
                setBoxes(fullArray);
            })
            .catch((error) => console.error('Fehler beim Abrufen der Box-Daten:', error));
    }, []);

    return (
        <div className="pageContainer">
            <Sidebar />
            <div className="content">
                <h1 className="Titel">Materialansicht</h1>
                <div className="boxContainerAnsicht">
                    <BoxGrid boxes={boxes} />
                </div>
            </div>
        </div>

    ); 
}

export default Materialansicht;
