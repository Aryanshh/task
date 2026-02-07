import React, { useState } from 'react';
import './AncientLock.css';

const AncientLock = ({ children, correctPin = "102950" }) => {
    const [isLocked, setIsLocked] = useState(true);
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);

    // Ancient symbols or just numbers with serif font
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    const handleNumClick = (num) => {
        if (pin.length < 6) {
            const newPin = pin + num;
            setPin(newPin);

            // Auto-check on 6th digit
            if (newPin.length === 6) {
                if (newPin === correctPin) {
                    setTimeout(() => setIsLocked(false), 500); // Dramatic delay
                } else {
                    setError(true);
                    setTimeout(() => {
                        setPin("");
                        setError(false);
                    }, 600);
                }
            }
        }
    };

    const handleClear = () => {
        setPin("");
        setError(false);
    };

    if (!isLocked) {
        return <div className="unlocked-content reveal-ancient">{children}</div>;
    }

    return (
        <div className="ancient-lock-container">
            <div className="ancient-frame">
                <h3 className="ancient-title">⚜️ Cryptex Security ⚜️</h3>

                {/* Display for PIN (Runes/Dots) */}
                <div className={`ancient-display ${error ? 'ancient-shake' : ''}`}>
                    {pin.padEnd(6, '•').split('').map((char, i) => (
                        <span key={i} className={`rune-slot ${i < pin.length ? 'filled' : ''}`}>
                            {i < pin.length ? char : '•'}
                        </span>
                    ))}
                </div>

                <div className="ancient-keypad">
                    {keys.map((num) => (
                        <button key={num} className="ancient-key" onClick={() => handleNumClick(num.toString())}>
                            {num}
                        </button>
                    ))}
                    <button className="ancient-key clear-ancient" onClick={handleClear}>✖</button>
                </div>

                <div className="ancient-footer">Enter the Secret Code</div>
            </div>
        </div>
    );
};

export default AncientLock;
