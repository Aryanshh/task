import React, { useRef, useEffect, useState } from 'react';

const FlappyHeartGame = ({ onUnlock }) => {
    const canvasRef = useRef(null);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [score, setScore] = useState(0);

    const [gameStarted, setGameStarted] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(0);

    // Game Constants
    const GRAVITY = 0.4;
    const JUMP = -6;
    const PIPE_SPEED = 2;
    const PIPE_SPAWN_RATE = 1800; // ms
    const WIN_SCORE = 5; // Pass 5 pipes to see the heart

    const handleStart = () => {
        setGameStarted(true);
    };

    const handleReset = () => {
        setGameStarted(true);
        setResetTrigger(prev => prev + 1);
    };

    useEffect(() => {
        if (!gameStarted) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let lastTime = 0;
        let pipeTimer = 0;

        // Reset React State for UI overlays
        setGameOver(false);
        setGameWon(false);
        setScore(0);

        // Game State
        let bird = { x: 50, y: 300, velocity: 0, radius: 20 };
        let pipes = [];
        let particles = []; // For death effect
        let heartTarget = null; // The final goal
        let isRunning = true;
        let localScore = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth > 600 ? 600 : window.innerWidth - 40;
            canvas.height = 500;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const spawnPipe = () => {
            const gapHeight = 220; // Easier gap
            const minPipeHeight = 50;
            const maxPipeHeight = canvas.height - gapHeight - minPipeHeight;
            const topHeight = Math.random() * (maxPipeHeight - minPipeHeight) + minPipeHeight;

            pipes.push({
                x: canvas.width,
                topHeight: topHeight,
                bottomY: topHeight + gapHeight,
                width: 50,
                passed: false
            });
        };

        const drawBird = () => {
            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🐦', bird.x, bird.y);
        };

        const drawPipes = () => {
            ctx.fillStyle = '#4cc9f0'; // Light blue pipes
            pipes.forEach(pipe => {
                // Top Pipe
                ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
                // Bottom Pipe
                ctx.fillRect(pipe.x, pipe.bottomY, pipe.width, canvas.height - pipe.bottomY);
            });
        };

        const drawHeartTarget = () => {
            if (heartTarget) {
                ctx.font = '50px Arial';
                ctx.fillText('💖', heartTarget.x, heartTarget.y);
            }
        };

        const checkCollision = () => {
            // Floor/Ceiling
            if (bird.y + bird.radius >= canvas.height || bird.y - bird.radius <= 0) {
                return true;
            }

            // Pipes
            for (let pipe of pipes) {
                // Horizontal overlapping
                if (bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + pipe.width) {
                    // Vertical Collision (hitting top pipe OR hitting bottom pipe)
                    if (bird.y - bird.radius < pipe.topHeight || bird.y + bird.radius > pipe.bottomY) {
                        return true;
                    }
                }
            }
            return false;
        };

        const update = (time) => {
            const deltaTime = time - lastTime;
            lastTime = time;

            if (!isRunning) return;

            // Clear Canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Background (Sky)
            ctx.fillStyle = '#fdf5c9'; // Match theme
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Bird Physics
            bird.velocity += GRAVITY;
            bird.y += bird.velocity;
            drawBird();

            // Pipes Logic
            if (!heartTarget) { // Stop spawning if heart is meant to appear
                pipeTimer += deltaTime;
                if (pipeTimer > PIPE_SPAWN_RATE) {
                    spawnPipe();
                    pipeTimer = 0;
                }
            }

            pipes.forEach(pipe => {
                pipe.x -= PIPE_SPEED;
            });

            // Remove off-screen pipes
            pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
            drawPipes();

            // Score Logic
            pipes.forEach(pipe => {
                if (!pipe.passed && bird.x > pipe.x + pipe.width) {
                    pipe.passed = true;
                    localScore++;
                    setScore(localScore);

                    // Win Condition Trigger
                    if (localScore >= WIN_SCORE && !heartTarget) {
                        heartTarget = { x: canvas.width + 100, y: canvas.height / 2 };
                    }
                }
            });

            // Heart Target Logic
            if (heartTarget) {
                heartTarget.x -= PIPE_SPEED;
                drawHeartTarget();

                // Check Collection
                const dist = Math.hypot(bird.x - heartTarget.x, bird.y - heartTarget.y);
                if (dist < 50) {
                    setGameWon(true);
                    isRunning = false;
                    onUnlock();
                    return; // Stop loop
                }
            }

            // Collision Check
            if (checkCollision()) {
                setGameOver(true);
                isRunning = false;
            }

            animationFrameId = requestAnimationFrame(update);
        };

        const handleInput = () => {
            if (isRunning) {
                bird.velocity = JUMP;
            } else if (gameOver && !gameWon) {
                // If game over, just reset by triggering the effect again via state if we wanted
                // But generally the Reset button is better. 
                // We'll leave click-to-reset here for convenience (calls same logic as reset usually)
                // But for now, let's make it strict: Use Reset Button.
                // Or: handleReset(); // Auto-restart on click?
                // User asked for Reset BUTTON. Let's keep click-flap ONLY for flapping.
            }
        };

        // Event Listeners
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault(); // Prevent scrolling
                handleInput();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        canvas.addEventListener('mousedown', handleInput);
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleInput();
        }, { passive: false });

        // Start Loop
        animationFrameId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [onUnlock, gameStarted, resetTrigger]);

    return (
        <div className="flappy-game-section" style={{
            background: '#e0f7fa',
            padding: '50px 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
            flexWrap: 'wrap'
        }}>
            {/* Game Canvas Container */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={500}
                    style={{
                        border: '4px solid #333',
                        borderRadius: '10px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                        cursor: 'pointer',
                        maxWidth: '100%',
                        display: 'block',
                        background: '#fdf5c9'
                    }}
                />

                {!gameStarted && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: '#d80032',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        pointerEvents: 'none'
                    }}>
                        Press Start Button 👉
                    </div>
                )}

                {/* Score & Messages Overlay */}
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#d80032',
                    pointerEvents: 'none'
                }}>
                    {score} / {WIN_SCORE}
                </div>

                {gameOver && !gameWon && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'rgba(255,255,255,0.9)',
                        padding: '20px',
                        borderRadius: '10px',
                        textAlign: 'center',
                        color: '#333',
                        width: '80%'
                    }}>
                        <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>Ouch! 💥</h3>
                        <p>Press Reset to try again</p>
                    </div>
                )}

                {gameWon && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'rgba(255, 235, 238, 0.95)',
                        padding: '30px',
                        borderRadius: '15px',
                        textAlign: 'center',
                        color: '#d80032',
                        border: '2px solid #ff4d6d',
                        width: '90%'
                    }}>
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Unlocked! 🎉</h3>
                        <p>Scroll down to explore...</p>
                    </div>
                )}
            </div>

            {/* Sidebar Instructions & Controls */}
            <div style={{ maxWidth: '400px', textAlign: 'left' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', color: '#d80032', marginBottom: '20px', fontSize: '2.5rem' }}>
                    Reunite with your Heart! 💖
                </h2>
                <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
                    <p style={{ marginBottom: '15px' }}>
                        <strong>How to Play:</strong>
                    </p>
                    <ul style={{ listStyle: 'none' }}>
                        <li style={{ marginBottom: '10px' }}>👉 Use <strong>Space Bar</strong> or <strong>Click</strong> to jump.</li>
                        <li style={{ marginBottom: '10px' }}>👉 Dodge the pipes!</li>
                        <li>❤️ Collect the <strong>Heart</strong> to unlock our memories.</li>
                    </ul>
                </div>

                {/* Control Buttons */}
                <div style={{ display: 'flex', gap: '15px' }}>
                    {!gameStarted ? (
                        <button
                            onClick={handleStart}
                            style={{
                                background: '#d80032',
                                color: 'white',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '30px',
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}>
                            Start Game 🚀
                        </button>
                    ) : (
                        <button
                            onClick={handleReset}
                            style={{
                                background: '#ff8fa3',
                                color: '#590d22',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '30px',
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}>
                            Reset Game 🔄
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FlappyHeartGame;
