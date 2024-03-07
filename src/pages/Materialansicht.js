import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import BoxGrid from '../Components/BoxGrid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import '../CSS/BoxComponent.css';

function Materialansicht() {
    const [boxes, setBoxes] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate(); // Hook für die Navigation

    useEffect(() => {
        axios.get('/api/BoxMaterial/boxes')
            .then(response => {
                const fullArray = new Array(208).fill(null).map((item, index) => {
                    return response.data.find(box => box.BoxID === index + 1) || { BoxID: index + 1, Menge: 0 };
                });
                setBoxes(fullArray);
            })
            .catch(error => console.error('Fehler beim Abrufen der Box-Daten:', error));
    }, []);

    const handleSearch = (searchTerm) => {
        if (searchTerm) {
            axios.get(`/api/BoxMaterial/search/${searchTerm}`)
                .then(response => {
                    setSearchResults(response.data);
                })
                .catch(error => console.error('Fehler bei der Suche:', error));
        }
    };

    return (
        <div className="pageContainer">
            <Sidebar />
            <div className="content">
                <div className="titleAndSearchContainer"> {/* Hinzugefügter Container */}
                    <h1 className="Titel">Lager</h1>
                    <div className="Flex">
                        <Autocomplete
                            freeSolo
                            options={searchResults.map((option) => option.Bezeichnung)}
                            onInputChange={(event, newInputValue) => {
                                handleSearch(newInputValue);
                            }}
                            onChange={(event, newValue) => {
                                const selectedBox = searchResults.find(result => result.Bezeichnung === newValue);
                                if (selectedBox) navigate(`/material-detail/${selectedBox.BoxID}`);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Material suchen..." variant="outlined" className="textFieldMaterialansicht" />
                            )}
                        />
                    </div>
                </div>
                <div className="boxContainerAnsicht">
                    <p></p>
                    <BoxGrid boxes={boxes} />
                </div>
            </div>
        </div>
    );
}

export default Materialansicht;
