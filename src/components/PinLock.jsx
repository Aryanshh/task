import React, { useState } from 'react';
import './PinLock.css';

const PinLock = ({ children, correctPin = "102950" }) => {
    const [isLocked, setIsLocked] = useState(true);
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);

    const handleNumClick = (num) => {
        if (pin.length < 6) {
            const newPin = pin + num;
            setPin(newPin);

            // Auto-check on 6th digit
            if (newPin.length === 6) {
                if (newPin === correctPin) {
                    setTimeout(() => setIsLocked(false), 300); // Slight delay for UX
                } else {
                    setError(true);
                    setTimeout(() => {
                        setPin("");
                        setError(false);
                    }, 500);
                }
            }
        }
    };

    const handleClear = () => {
        setPin("");
        setError(false);
    };

    if (!isLocked) {
        return <div className="unlocked-content fade-in">{children}</div>;
    }

    return (
        <div className="pin-lock-container">
            <div className="pin-display">
                <h3>Enter Password</h3>
                <div className={`dots-container ${error ? 'shake' : ''}`}>
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className={`dot ${pin.length > i ? 'active' : ''}`}></div>
                    ))}
                </div>
            </div>

            <div className="keypad">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button key={num} className="key" onClick={() => handleNumClick(num.toString())}>
                        {num}
                    </button>
                ))}
                <button className="key transparent"></button>
                <button className="key" onClick={() => handleNumClick("0")}>0</button>
                <button className="key clear-btn" onClick={handleClear}>⌫</button>
            </div>
        </div>
    );
};

export default PinLock;
