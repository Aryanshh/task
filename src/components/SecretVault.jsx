import React, { useState } from 'react';
import './SecretVault.css';

import confetti from 'canvas-confetti';

// Import secret images
import secret1 from '../assets/secrets/66.jpeg';
import secret2 from '../assets/secrets/55.jpeg';

const VaultItem = ({ id, question, answer, hiddenContent, bg }) => {
    const [unlocked, setUnlocked] = useState(false);
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    const triggerConfetti = () => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 }
        };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.toLowerCase().trim() === answer.toLowerCase().trim()) {
            triggerConfetti();
            setUnlocked(true);
        } else {
            setError(true);
            setTimeout(() => setError(false), 1000);
        }
    };

    if (unlocked) {
        return (
            <div className="vault-item unlocked fade-in">
                {hiddenContent}
            </div>
        );
    }

    return (
        <div className={`vault-item locked ${error ? 'shake' : ''}`}>
            <div className="lock-icon">🔒</div>
            <h3>Secret Question #{id}</h3>
            <p>{question}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type your answer..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">Unlock</button>
            </form>
        </div>
    );
};

const SecretVault = () => {
    return (
        <section className="vault-section container">
            <h2>Secret Vault 🤫</h2>
            <p className="vault-subtitle">Answer to reveal hidden memories...</p>

            <div className="vault-grid">
                <VaultItem
                    id="1"
                    question="Which part of you I like the most?"
                    answer="neck"
                    hiddenContent={
                        <div className="secret-content">
                            <img src={secret1} alt="Secret 1" />
                            <p>Correct! You know it 😉</p>
                        </div>
                    }
                />

                <VaultItem
                    id="2"
                    question="Where did we first hug?"
                    answer="keshi ghat"
                    hiddenContent={
                        <div className="secret-content">
                            <img src={secret2} alt="Secret 2" />
                            <p>Aww, yes! The 2nd year was special.</p>
                        </div>
                    }
                />
            </div>

        </section>
    );
};

export default SecretVault;
