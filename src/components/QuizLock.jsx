import React, { useState } from 'react';
import './QuizLock.css';

const QuizLock = ({ children }) => {
    const [isLocked, setIsLocked] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [errorId, setErrorId] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // Options for the quiz
    const options = [
        { id: 'A', text: 'You are beautiful', correct: false },
        { id: 'B', text: 'You are smart', correct: false },
        { id: 'C', text: 'You are kind', correct: false },
        { id: 'D', text: 'All of the mentioned', correct: true }
    ];

    const handleStart = () => {
        setShowQuiz(true);
    };

    const handleOptionClick = (option) => {
        if (option.correct) {
            setShowSuccess(true);
            setTimeout(() => {
                setIsLocked(false);
            }, 2000); // 2 seconds to admire the "Cutie" message
        } else {
            setErrorId(option.id);
            setTimeout(() => setErrorId(null), 500);
        }
    };

    if (!isLocked) {
        return <div className="unlocked-content fade-in">{children}</div>;
    }

    return (
        <div className="quiz-lock-container">
            <div className="quiz-card">
                {showSuccess ? (
                    <div className="success-message fade-in">
                        <h3>Cutie! 😘</h3>
                        <p>You got it right!</p>
                    </div>
                ) : !showQuiz ? (
                    /* Initial Start Screen */
                    <div className="quiz-start fade-in">
                        <h3 className="quiz-question">One Question to see us... 🔒</h3>
                        <button className="quiz-start-btn" onClick={handleStart}>
                            I'll Answer 🙋‍♀️
                        </button>
                    </div>
                ) : (
                    /* The Quiz */
                    <div className="fade-in">
                        <h3 className="quiz-question">Why do I love you? 💖</h3>

                        <div className="quiz-options">
                            {options.map((option) => (
                                <button
                                    key={option.id}
                                    className={`quiz-btn ${errorId === option.id ? 'shake-btn' : ''}`}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    <span className="option-letter">{option.id}</span>
                                    <span className="option-text">{option.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizLock;
