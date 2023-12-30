import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

import Sidebar from '../Components/Sidebar';
import '../CSS/General.css';
import '../CSS/Materialverwaltung.css';

function Materialverwaltung() {
    const [count, setCount] = useState(1);
    const [invisible, setInvisible] = useState(false);
    const [materialien, setMaterialien] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const apiUrl = 'http://localhost:3100/api/Materialtyp';

        axios.get(apiUrl)
            .then((response) => setMaterialien(response.data))
            .catch((error) => console.error('Fehler beim Abrufen der Materialdaten:', error));
    }, []);

    const handleBadgeVisibility = () => {
        setInvisible(!invisible);
    };

    // Filtere Materialien basierend auf dem Suchbegriff
    const filteredMaterialien = materialien.filter(
        (material) => material.Bezeichnung.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    return (
        <div className="body">
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div className="dashboard-content">
                    <h1>Materialverwaltung</h1>
                    <Box sx={{ width: '40%', marginTop: '16px' }}>
                        <TextField
                            id="outlined-search"
                            label="Suche nach Anfangsbuchstaben"
                            type="search"
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ width: '100%' }}
                        />
                    </Box>
                    <Paper sx={{ width: '40%', overflow: 'hidden' }}>
                        {/* Searchbar */}
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Verfügbar</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredMaterialien.map((Materialtyp) => (
                                        <TableRow key={Materialtyp.MaterialtypID}>
                                            <TableCell>{Materialtyp.MaterialtypID}</TableCell>
                                            <TableCell>{Materialtyp.Bezeichnung}</TableCell>
                                            <TableCell>{Materialtyp.SollBestand}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <div className="Search-ID">
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            {/* Rest des Codes bleibt unverändert */}
                            {/* ... */}
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
                        {/* Rest des Codes bleibt unverändert */}
                        {/* ... */}
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Materialverwaltung;
