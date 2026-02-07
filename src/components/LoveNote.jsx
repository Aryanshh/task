import React, { useState } from 'react';
import './LoveNote.css';
import LockWrapper from './LockWrapper';

const LoveNote = () => {
    const [isOpen, setIsOpen] = useState(false);

    const messages = [
        "You are the best thing that ever happened to me.",
        "Your smile lights up my world.",
        "I love you more than words can say.",
        "Babe, you are my everything <3"
    ];

    const [currentMessage, setCurrentMessage] = useState(messages[0]);

    const toggleNote = () => {
        if (!isOpen) {
            // Pick a random message each time we open
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            setCurrentMessage(randomMsg);
        }
        setIsOpen(!isOpen);
    };

    return (
        <section className="note-section container">
            <h2>A Letter for My Valentine 💌</h2>

            <div className="letter-lock-container">
                {/* Lock Barrier */}
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <LockWrapper unlockMessage="Unlock My Heart">
                        {/* Envelope Interaction - Triggers Modal */}
                        <div className="envelope" onClick={toggleNote}>
                            <div className="flap"></div>
                            <div className="body"></div>
                            {/* Peek of letter inside */}
                            <div className="letter-preview"></div>
                            <div className="heart-seal">❤️</div>
                        </div>

                        <p className="instruction">
                            Click the sealed envelope to read...
                        </p>
                    </LockWrapper>
                </div>
            </div>

            {/* Full Screen Modal */}
            {isOpen && (
                <div className="letter-modal-overlay" onClick={toggleNote}>
                    <div className="letter-modal-content paper-texture" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={toggleNote}>&times;</button>

                        <div className="formal-letter-content">
                            <div className="letter-header">
                                <span className="date">February 14, 2026</span>
                            </div>
                            <p className="salutation">My Dearest Nmii,</p>
                            <p className="letter-body">
                                {currentMessage}
                            </p>
                            <p className="letter-body">
                                Every moment with you is a treasure I hold dear. You are the melody to my heart's song.
                            </p>
                            <div className="closing">
                                <p>Forever Yours,</p>
                                <p className="signature-text">Me</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default LoveNote;
