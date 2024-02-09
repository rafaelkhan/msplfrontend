import React, { useState } from 'react';
import { Card, Typography, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

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

    const getBoxContainerClass = () => {
        if (isHovered) {
            return 'boxContainer';
        } else if (isActive) {
            return 'boxContainer active';
        } else if (isEmpty) {
            return 'boxContainer default';
        } else {
            return 'boxContainer empty';
        }
    };

    return (
        <Card
            className={getBoxContainerClass()}
                raised
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Typography variant="caption" className="captionTypography"> Box {box.BoxID} </Typography>

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
                    <Link to={`/material-detail/${box.BoxID}`} className="fullscreenLink"></Link>
                </Tooltip>
            )}
        </Card>
    );
};

export default BoxComponent;
