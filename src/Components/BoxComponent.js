import React, { useState } from 'react';
import { Card, Typography, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import '../CSS/BoxComponent.css';

const BoxComponent = ({ box }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const isActive = box.Menge > 0;
    const isEmpty = box.Bezeichnung != null;

    return (
        <Card
            className="boxContainer"
            raised
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                height: '4vw',
                alignItems: 'center',
                backgroundColor: isHovered ? '#A9A9A9n' : (isActive ? '#A7C7E7' : (isEmpty ? '#ff6961' : '#cfcfc4')),
                position: 'relative',
                transition: 'background-color 0.3s',
            }}
        >
            <Typography variant="caption" sx={{ position: 'absolute', top: '5px', right: '5px' }}>
                Box {box.BoxID}
            </Typography>

            {(isActive || isEmpty) && (
                <Tooltip
                    title={
                        <React.Fragment>
                            <Typography color="inherit">{box.Bezeichnung}</Typography>
                            {"Menge: " + box.Menge}
                        </React.Fragment>
                    }
                    open={isHovered}
                    placement="top"
                >
                    <Link to={`/material-detail/${box.BoxID}`} style={{ textDecoration: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 1000 }} />
                </Tooltip>
            )}
        </Card>
    );
};

export default BoxComponent;
