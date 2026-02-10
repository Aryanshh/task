import React, { useRef, useState, useEffect } from 'react';
import './VideoGallery.css';

// Video paths relative to public folder
const videos = [
    '/videos/mem1.mp4',
    '/videos/mem2.mp4',
    '/videos/mem3.mp4',
    '/videos/mem4.mp4',
    '/videos/mem5.mp4',
    '/videos/mem6.mp4',
    '/videos/mem7.mp4',
    '/videos/mem8.mp4',
    '/videos/mem9.mp4',
    '/videos/mem10.mp4',
    '/videos/mem11.mp4'
];

const VideoItem = ({ src, index, onOpen, isLiked }) => {
    return (
        <div className="video-card" onClick={() => onOpen(index)}>
            <video
                src={src}
                className="gallery-video"
                loop
                muted
                onMouseOver={event => event.target.play()}
                onMouseOut={event => {
                    event.target.pause();
                    event.target.currentTime = 0;
                }}
            />
            <div className="play-overlay">
                <span className="play-icon">▶</span>
            </div>
            {isLiked && <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '1.5rem' }}>❤️</div>}
        </div>
    );
};

const VideoGallery = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [likedVideosGlobal, setLikedVideosGlobal] = useState(new Set());

    // Local state for the CURRENT session/view of a video.
    const [hasInteractedCurrent, setHasInteractedCurrent] = useState(false);
    // Track which of the hearts are clicked for the current video. 
    // We have 6 hearts now (3 left, 3 right) to balance sides.
    const [sessionLikes, setSessionLikes] = useState([false, false, false, false, false, false]);

    // Reset interaction state when video changes
    useEffect(() => {
        setHasInteractedCurrent(false);
        setSessionLikes([false, false, false, false, false, false]);
    }, [selectedVideo]);

    const openLightbox = (index) => {
        setSelectedVideo(index);
    };

    const closeLightbox = () => {
        setSelectedVideo(null);
    };

    const nextVideo = () => {
        if (!hasInteractedCurrent) {
            alert("Send some love (click hearts on the side) to unlock the next memory! ❤️");
            return;
        }
        setSelectedVideo((prev) => (prev + 1) % videos.length);
    };

    const prevVideo = (e) => {
        e?.stopPropagation();
        setSelectedVideo((prev) => (prev - 1 + videos.length) % videos.length);
    };

    const handleHeartClick = (heartIndex) => {
        const newSessionLikes = [...sessionLikes];
        newSessionLikes[heartIndex] = true;
        setSessionLikes(newSessionLikes);

        setHasInteractedCurrent(true);

        if (selectedVideo !== null) {
            setLikedVideosGlobal(prev => {
                const newSet = new Set(prev);
                newSet.add(selectedVideo);
                return newSet;
            });
        }
    };

    const handleVideoEnded = () => {
        if (hasInteractedCurrent) {
            setTimeout(() => {
                nextVideo();
            }, 500);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedVideo === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextVideo();
            if (e.key === 'ArrowLeft') prevVideo();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedVideo, hasInteractedCurrent]);

    const heartsLeft = ['❤️', '💖', '💝'];
    const heartsRight = ['💓', '💗', '💕'];

    return (
        <>
            <div className="video-gallery-grid">
                {videos.map((vid, index) => (
                    <VideoItem
                        key={index}
                        src={vid}
                        index={index}
                        onOpen={openLightbox}
                        isLiked={likedVideosGlobal.has(index)}
                    />
                ))}
            </div>

            {selectedVideo !== null && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="close-btn" onClick={closeLightbox}>&times;</button>

                    <button className="nav-btn prev-btn" onClick={prevVideo}>&#10094;</button>

                    <div className="lightbox-content-row" onClick={(e) => e.stopPropagation()}>

                        {/* Left Hearts Column */}
                        <div className="side-hearts-column">
                            {heartsLeft.map((icon, idx) => (
                                <button
                                    key={`left-${idx}`}
                                    className={`gate-heart-btn ${sessionLikes[idx] ? 'clicked' : ''}`}
                                    onClick={() => handleHeartClick(idx)}
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>

                        {/* Video Container */}
                        <div style={{ position: 'relative' }}>
                            <p className="love-prompt-overlay">
                                {hasInteractedCurrent ? "Unlocked! 🔓" : "Tap Hearts to Unlock 🔒"}
                            </p>
                            <video
                                src={videos[selectedVideo]}
                                className={`lightbox-video ${hasInteractedCurrent ? 'video-unlocked' : 'video-locked'}`}
                                controls
                                autoPlay
                                onEnded={handleVideoEnded}
                            />
                        </div>

                        {/* Right Hearts Column */}
                        <div className="side-hearts-column">
                            {heartsRight.map((icon, idx) => (
                                <button
                                    key={`right-${idx}`}
                                    className={`gate-heart-btn ${sessionLikes[idx + 3] ? 'clicked' : ''}`}
                                    onClick={() => handleHeartClick(idx + 3)}
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>

                    </div>

                    <button
                        className={`nav-btn next-btn ${!hasInteractedCurrent ? 'disabled' : ''}`}
                        onClick={(e) => { e.stopPropagation(); nextVideo(); }}
                        disabled={!hasInteractedCurrent}
                    >
                        &#10095;
                    </button>
                </div>
            )}
        </>
    );
};

export default VideoGallery;
