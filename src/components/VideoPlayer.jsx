import React from 'react';
import './VideoPlayer.css';
import QuizLock from './QuizLock';
import VideoGallery from './VideoGallery';

import SectionHearts from './SectionHearts';

const VideoPlayer = () => {
    return (
        <section className="video-section container" style={{ position: 'relative' }}>
            <SectionHearts />
            <h2>Our Journey 🎬</h2>
            <div className="video-lock-container" style={{ position: 'relative', zIndex: 1 }}>
                <QuizLock>
                    <VideoGallery />
                </QuizLock>
            </div>
        </section>
    );
};


export default VideoPlayer;
