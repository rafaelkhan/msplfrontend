import React, { useState, useEffect } from 'react';

const WelcomeMessage = ({ firstname }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const text = `Willkommen ${firstname}.`;

    useEffect(() => {
        if (index < text.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText(text.substring(0, index + 1));
                setIndex(index + 1);
            }, 100);

            return () => clearTimeout(timeoutId);
        }
    }, [index, text]);

    return <h2 className="name-Willkommen">{displayedText}</h2>;
};

export default WelcomeMessage;
