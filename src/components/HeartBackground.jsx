import React, { useEffect, useState } from 'react';
import './HeartBackground.css';

const HeartBackground = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Date.now();
            const style = {
                left: Math.random() * 100 + 'vw',
                animationDuration: Math.random() * 3 + 2 + 's',
                opacity: Math.random(),
                fontSize: Math.random() * 20 + 10 + 'px',
            };

            setHearts(prev => [...prev, { id, style }]);

            // Cleanup old hearts to prevent memory leak
            setTimeout(() => {
                setHearts(prev => prev.filter(h => h.id !== id));
            }, 5000);
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="heart-container">
            {hearts.map(heart => (
                <div key={heart.id} className="falling-heart" style={heart.style}>
                    ❤️
                </div>
            ))}
        </div>
    );
};

export default HeartBackground;
