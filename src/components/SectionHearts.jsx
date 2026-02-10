import React, { useEffect, useState } from 'react';
import './SectionHearts.css';

const SectionHearts = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Spawn 1-2 hearts at a time
            const count = Math.floor(Math.random() * 2) + 1;

            for (let i = 0; i < count; i++) {
                const id = Date.now() + i;
                const side = Math.random() > 0.5 ? 'left' : 'right';
                const animationDuration = Math.random() * 5 + 6; // 6-11s
                const size = Math.random() * 2 + 1; // 1rem - 3rem
                const delay = Math.random() * 0.5;

                // Random end position (horizontal)
                // Left side: ends between 10vw and 50vw
                // Right side: ends between 50vw and 90vw
                const endX = side === 'left'
                    ? Math.random() * 40 + 10
                    : Math.random() * 40 + 50;

                setHearts(prev => [...prev, { id, side, animationDuration, size, delay, endX }]);

                // Cleanup
                setTimeout(() => {
                    setHearts(prev => prev.filter(h => h.id !== id));
                }, (animationDuration + delay) * 1000);
            }
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="section-hearts-container">
            {hearts.map(heart => (
                <div
                    key={heart.id}
                    className="floating-section-heart"
                    style={{
                        animationName: heart.side === 'left' ? 'floatFromLeft' : 'floatFromRight',
                        animationDuration: `${heart.animationDuration}s`,
                        animationDelay: `${heart.delay}s`,
                        animationTimingFunction: 'ease-in-out',
                        fontSize: `${heart.size}rem`,
                        opacity: Math.max(0.4, 1 - (heart.size / 4)),
                        '--tx-end': `${heart.endX}vw` // Pass to CSS
                    }}
                >
                    ❤️
                </div>
            ))}
        </div>
    );
};

export default SectionHearts;
