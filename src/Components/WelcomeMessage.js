import React, { useState, useEffect } from 'react';

const WelcomeMessage = ({ firstname }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let intervalId;

        const displayTextLetterByLetter = () => {
            const text = `Willkommen ${firstname}.`;
            let index = 0;

            intervalId = setInterval(() => {
                setDisplayedText((prevText) => prevText + text[index]);
                index++;

                if (index === text.length) {
                    clearInterval(intervalId);
                }
            }, 100);
        };

        displayTextLetterByLetter();

        return () => clearInterval(intervalId);
    }, [firstname]);

    return <h2 className="name-Willkommen">{displayedText}</h2>;
};

export default WelcomeMessage;
