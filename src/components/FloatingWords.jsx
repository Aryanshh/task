import React from 'react';
import './FloatingWords.css';

const words = [
    { text: "Paglu", top: "15%", left: "10%", delay: "0s" },
    { text: "Cutie", top: "20%", right: "15%", delay: "1s" },
    { text: "Chotu", bottom: "25%", left: "15%", delay: "2s" },
    { text: "Sitaare Wargi", bottom: "15%", right: "10%", delay: "3s" }
];

const FloatingWords = () => {
    return (
        <div className="floating-words-container">
            {words.map((item, index) => (
                <span
                    key={index}
                    className="floating-word"
                    style={{
                        top: item.top,
                        left: item.left,
                        right: item.right,
                        bottom: item.bottom,
                        animationDelay: item.delay
                    }}
                >
                    {item.text}
                </span>
            ))}
        </div>
    );
};

export default FloatingWords;
