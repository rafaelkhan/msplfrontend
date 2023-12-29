import React from 'react';
import Sidebar from '../Components/Sidebar';
import '../CSS/General.css';
import '../CSS/Materialverwaltung.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Badge, Button, ButtonGroup, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Materialverwaltung() {
    const [count, setCount] = React.useState(1);
    const [invisible, setInvisible] = React.useState(false);
    const [materialien, setMaterialien] = useState([]);

    useEffect(() => {
        const apiUrl = 'http://localhost:3100/api/example';

        axios.get(apiUrl)
            .then((response) => setMaterialien(response.data))
            .catch((error) => console.error('Fehler beim Abrufen der Materialdaten:', error));
    }, []);

    const handleBadgeVisibility = () => {
        setInvisible(!invisible);
    };

    return (
        <div className="body">
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div className="dashboard-content">
                    <h1>Materialverwaltung</h1>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Verfügbar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {materialien.map((Materialattribut) => (
                            <tr key={Materialattribut.AttributName}>
                                <td>{Materialattribut.AttributName}</td>
                                <td>{Materialattribut.Einheit}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="Search-ID">
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="filled-multiline-flexible"
                                label="Search ID"
                                multiline
                                maxRows={4}
                                variant="filled"
                            />
                        </Box>
                    </div>
                    <Box
                        sx={{
                            color: 'action.active',
                            display: 'flex',
                            flexDirection: 'column',
                            '& > *': {
                                marginBottom: 2,
                            },
                            '& .MuiBadge-root': {
                                marginRight: 4,
                            },
                        }}
                    >
                        <div className="edit">

                            <Badge color="secondary" badgeContent={count}>
                                <LocalGroceryStoreIcon style={{ color: 'black' }} />
                            </Badge>
                            <ButtonGroup>
                                <Button
                                    aria-label="reduce"
                                    onClick={() => {
                                        setCount(count - 1);
                                    }}
                                >
                                    <RemoveIcon fontSize="small" style={{ color: 'black' }} />
                                </Button>
                                <Button
                                    aria-label="increase"
                                    onClick={() => {
                                        setCount(count + 1);
                                    }}
                                >
                                    <AddIcon fontSize="small" style={{ color: 'black' }} />
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Materialverwaltung;
