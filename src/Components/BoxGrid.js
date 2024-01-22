import React from 'react';
import { Grid } from '@mui/material';
import BoxComponent from './BoxComponent';

const BoxGrid = ({ boxes }) => {
    // Setzt die Breite jeder Box auf 12.5% des Grid Containers
    const boxWidth = { flexBasis: '6.25%', flexGrow: 0 };

    return (
        <Grid container spacing={1} sx={{ padding: 1 , width: '80%'}}>
            {boxes.map((box, index) => (
                <Grid item sx={boxWidth} key={index}>
                    <BoxComponent box={box} />
                </Grid>
            ))}
        </Grid>
    );
};

export default BoxGrid;
