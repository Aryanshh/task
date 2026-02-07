import React from 'react';
import './VideoPlayer.css';
import QuizLock from './QuizLock';

const VideoPlayer = () => {
    return (
        <section className="video-section container">
            <h2>Our Movie 🎬</h2>
            <div className="video-lock-container">
                <QuizLock>
                    <div className="video-wrapper">
                        <div className="video-frame">
                            {/* Replace with your actual video or Youtube embed */}
                            <video controls poster="https://placehold.co/800x450/ffb4a2/white?text=Video+Thumbnail">
                                <source src="#" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="video-placeholder-text">
                                (Add your special video here!)
                            </div>
                        </div>
                    </div>
                </QuizLock>
            </div>
        </section>
    );
};

export default VideoPlayer;
