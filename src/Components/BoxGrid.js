import React from 'react';
import { Grid } from '@mui/material';
import BoxComponent from './BoxComponent';
import '../CSS/BoxComponent.css';

const BoxGrid = ({ boxes }) => {
    return (
        <Grid container spacing={1}>
            {boxes.map((box, index) => (
                <Grid item className="boxItem" key={index}>
                    <BoxComponent box={box} />
                </Grid>
            ))}
        </Grid>
    );
};


export default BoxGrid;
