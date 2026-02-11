import React, { useEffect, useState } from 'react';
import './SectionHearts.css'; // Reusing the same CSS for animations

const SectionKisses = () => {
    const [kisses, setKisses] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Spawn 1-2 kisses at a time
            // Spawn 2-5 kisses at a time (increased for density)
            const count = Math.floor(Math.random() * 4) + 2;

            for (let i = 0; i < count; i++) {
                const id = Date.now() + i + Math.random(); // Unique IDs
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

                setKisses(prev => [...prev, { id, side, animationDuration, size, delay, endX }]);

                // Cleanup
                setTimeout(() => {
                    setKisses(prev => prev.filter(k => k.id !== id));
                }, (animationDuration + delay) * 1000);
            }
        }, 400); // Faster spawning for "a lot" more kisses

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="section-hearts-container" style={{ pointerEvents: 'none' }}>
            {kisses.map(kiss => (
                <div
                    key={kiss.id}
                    className="floating-section-heart"
                    style={{
                        animationName: kiss.side === 'left' ? 'floatFromLeft' : 'floatFromRight',
                        animationDuration: `${kiss.animationDuration}s`,
                        animationDelay: `${kiss.delay}s`,
                        animationTimingFunction: 'ease-in-out',
                        fontSize: `${kiss.size}rem`,
                        opacity: Math.max(0.4, 1 - (kiss.size / 4)),
                        '--tx-end': `${kiss.endX}vw` // Pass to CSS
                    }}
                >
                    💋
                </div>
            ))}
        </div>
    );
};

export default SectionKisses;
