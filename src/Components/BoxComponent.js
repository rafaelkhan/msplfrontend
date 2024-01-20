import React, { useState } from 'react';
import { Card, Typography, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import '../CSS/BoxComponent.css';

const BoxComponent = ({ box }) => {
    const [hover, setHover] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const isActive = box.Menge > 0;

    const handleMouseMove = (event) => {
        setHover(true);
        setOverlayVisible(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
        setOverlayVisible(false);
    };

    return (
        <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <Card
                className="boxContainer"
                raised
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '4vw',
                    alignItems: 'center',
                    backgroundColor: isActive ? 'lightblue' : 'grey',
                    position: 'relative',
                    transition: 'box-shadow 0.3s',
                }}
            >
                <Typography variant="caption" sx={{ position: 'absolute', top: '5px', right: '5px' }}>
                    Box {box.BoxID}
                </Typography>
                {isActive && hover && (
                    <Tooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit">{box.Bezeichnung}</Typography>
                                {"Menge: " + box.Menge}
                            </React.Fragment>
                        }
                        open={overlayVisible}
                        placement="top"
                    >
                        <Link to={`/material-detail/${box.BoxID}`} style={{ textDecoration: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 1000 }} />
                    </Tooltip>
                )}
            </Card>
        </div>
    );
};

export default BoxComponent;
