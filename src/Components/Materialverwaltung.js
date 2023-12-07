import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';
import './Materialverwaltung.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Badge, Button, ButtonGroup, TextField } from '@mui/material';

function Materialverwaltung() {
    const [count, setCount] = React.useState(1);
    const [invisible, setInvisible] = React.useState(false);

    const handleBadgeVisibility = () => {
        setInvisible(!invisible);
    };

    return (
        <div className="body">
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div className="dashboard-content">
                    <h1>Materialverwaltung</h1>
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
