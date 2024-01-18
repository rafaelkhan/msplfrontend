import React, { useState } from 'react';
import { Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '../CSS/BoxComponent.css';

const BoxComponent = ({ box }) => {
    const [hover, setHover] = useState(false);
    const isActive = box.Menge > 0;

    return (
        <Card
            raised={hover}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            sx={{
                height: '120px', // Quadratische Form
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isActive ? 'lightblue' : 'grey',
                position: 'relative',
                transition: 'box-shadow 0.3s',
                '&:hover .hoverContent': {
                    display: 'flex',
                }
            }}
        >
            <Typography
                variant="caption"
                sx={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    visibility: hover ? 'hidden' : 'visible',
                }}
            >
                Box {box.BoxID}
            </Typography>
            {isActive && (
                <div
                    className="hoverContent"
                    sx={{
                        display: 'none',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }}
                >
                    <Link to={`/material-detail/${box.MaterialtypID}`} style={{ textDecoration: 'none' }}>
                        <Typography sx={{ textAlign: 'center', color: 'black' }}>
                            {box.Bezeichnung} <br/> Menge: {box.Menge}
                        </Typography>
                    </Link>
                </div>
            )}
        </Card>
    );
};

export default BoxComponent;
