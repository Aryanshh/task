import React, { useState } from 'react';
import './LockWrapper.css';

const LockWrapper = ({ children, unlockMessage = "Unlock this Memory" }) => {
    const [isLocked, setIsLocked] = useState(true);

    const handleUnlock = () => {
        setIsLocked(false);
    };

    if (!isLocked) {
        return <div className="unlocked-content fade-in">{children}</div>;
    }

    return (
        <div className="lock-wrapper" onClick={handleUnlock}>
            <div className="lock-icon-container">
                <span className="lock-icon">🔒</span>
                <div className="lock-shackle"></div>
                <div className="lock-body"></div>
            </div>
            <p className="unlock-message">{unlockMessage}</p>
            <p className="unlock-hint">(Click to Open)</p>
        </div>
    );
};

export default LockWrapper;
