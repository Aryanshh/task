import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './LoveNote.css';
import LockWrapper from './LockWrapper';
import SectionHearts from './SectionHearts';

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
            <SectionHearts />
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

            {/* Full Screen Modal via Portal to escape container constraints */}
            {isOpen && createPortal(
                <div className="letter-modal-overlay" onClick={toggleNote}>
                    <SectionHearts />
                    <div className="letter-modal-content paper-texture" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={toggleNote}>&times;</button>

                        <div className="formal-letter-content">
                            <div className="letter-header">
                                <span className="date">February 14, 2026</span>
                            </div>
                            <p className="salutation">Dear Nmii,</p>
                            <p className="letter-body">
                                I know I have said this a 3000 bar, but I like you.. a lottt and thoda thoda zyada pyaar bhi hone laga hai idk how, you are one of the best things happened to me, and I hope this stays me with anyhow, I know I get annoying, creepy, restless but you mean a lottt to me.
                            </p>
                            <p className="letter-body">
                                I know you dont like to celebrate Valentines day, my apologies for forcing you through these days, but I want to cherish these moments with you throughout my life… 🥺
                            </p>
                            <p className="letter-body">
                                I hope to see “us” succeed and conquer everything we wished for.. 🧿
                            </p>
                            <p className="letter-body" style={{ fontStyle: 'italic', marginTop: '1rem' }}>
                                Hope to see you in black dress today
                            </p>
                            <div className="closing">
                                <p>Forever Yours,</p>
                                <p className="signature-text">Ryy</p>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
};

export default LoveNote;
