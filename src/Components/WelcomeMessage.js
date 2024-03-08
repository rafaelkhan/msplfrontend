import React, { useState, useEffect } from 'react';
import '../CSS/Dashboard.css';

const WelcomeMessage = ({ firstname }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const text = `Willkommen ${firstname}`;

    useEffect(() => {
        if (index < text.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText(text.substring(0, index + 1));
                setIndex(index + 1);
            }, 100);

            return () => clearTimeout(timeoutId);
        }
    }, [index, text]);

    return <span className="name-Willkommen">{displayedText}</span>;
};

export default WelcomeMessage;
