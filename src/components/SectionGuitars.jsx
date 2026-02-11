import React, { useEffect, useState } from 'react';
import './SectionHearts.css'; // Reusing the same CSS for animations
import guitarImg from '../assets/decorations/guitar.png';

const SectionGuitars = () => {
    const [guitars, setGuitars] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Spawn 1 guitar at a time (less dense than kisses)
            const id = Date.now();
            const side = Math.random() > 0.5 ? 'left' : 'right';
            const animationDuration = Math.random() * 5 + 8; // 8-13s (slower)
            const size = Math.random() * 60 + 40; // 40px - 100px width
            const delay = Math.random() * 2;
            const rotation = Math.random() * 40 - 20; // -20 to 20 deg tilt

            // Random end position (horizontal)
            const endX = side === 'left'
                ? Math.random() * 40 + 10
                : Math.random() * 40 + 50;

            setGuitars(prev => [...prev, { id, side, animationDuration, size, delay, endX, rotation }]);

            // Cleanup
            setTimeout(() => {
                setGuitars(prev => prev.filter(g => g.id !== id));
            }, (animationDuration + delay) * 1000);

        }, 1500); // Spawn every 1.5s

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="section-hearts-container" style={{ pointerEvents: 'none', zIndex: 0 }}>
            {guitars.map(item => (
                <img
                    key={item.id}
                    src={guitarImg}
                    alt="Floating Guitar"
                    className="floating-section-heart" // Reusing class for animation
                    style={{
                        position: 'absolute',
                        width: `${item.size}px`,
                        height: 'auto',
                        animationName: item.side === 'left' ? 'floatFromLeft' : 'floatFromRight',
                        animationDuration: `${item.animationDuration}s`,
                        animationDelay: `${item.delay}s`,
                        animationTimingFunction: 'linear',
                        opacity: 0.6,
                        left: item.side === 'left' ? '-100px' : 'auto',
                        right: item.side === 'right' ? '-100px' : 'auto',
                        transform: `rotate(${item.rotation}deg)`,
                        '--tx-end': `${item.endX}vw` // Pass to CSS
                    }}
                />
            ))}
        </div>
    );
};

export default SectionGuitars;
