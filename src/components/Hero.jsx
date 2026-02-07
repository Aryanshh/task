import React from 'react';
import './Hero.css';
import FloatingWords from './FloatingWords';

const Hero = () => {
    return (
        <section className="hero">
            <FloatingWords />
            <div className="hero-content">
                <h1 className="title">Happy Valentine's Day,<br /><span>Nmii</span> 💖</h1>
                <p className="subtitle">You make my heart smile every single day.</p>
                <div className="scroll-indicator">
                    Scroll for Love ↓
                </div>
            </div>
        </section>
    );
};

export default Hero;
