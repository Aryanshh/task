import React, { useState } from 'react';
import './SecretVault.css';

const VaultItem = ({ id, question, answer, hiddenContent, bg }) => {
    const [unlocked, setUnlocked] = useState(false);
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.toLowerCase().trim() === answer.toLowerCase().trim()) {
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
                    question="Where did we first meet? (Hint: Cafe)"
                    answer="Cafe"
                    hiddenContent={
                        <div className="secret-content">
                            <img src="https://placehold.co/400x400/ff4d6d/white?text=Secret+Photo+1" alt="Secret 1" />
                            <p>Correct! Our first date was magic.</p>
                        </div>
                    }
                />

                <VaultItem
                    id="2"
                    question="What is my favorite color? (Hint: Pink)"
                    answer="Pink"
                    hiddenContent={
                        <div className="secret-content">
                            <img src="https://placehold.co/400x400/d80032/white?text=Secret+Photo+2" alt="Secret 2" />
                            <p>You know me so well!</p>
                        </div>
                    }
                />
            </div>
        </section>
    );
};

export default SecretVault;
