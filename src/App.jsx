import React, { useState } from 'react';
import HeartBackground from './components/HeartBackground';
import Hero from './components/Hero';
import FlappyHeartGame from './components/FlappyHeartGame'; // Import Game
import PhotoCollage from './components/PhotoCollage';
import SongDedication from './components/SongDedication';
import SecretVault from './components/SecretVault';
import VideoPlayer from './components/VideoPlayer';
import LoveNote from './components/LoveNote';
import BeatingHeart from './components/BeatingHeart';
import SectionDivider from './components/SectionDivider';
import './index.css'; // Ensure global styles are applied

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="app-container">
      <HeartBackground />

      <main>
        <Hero />

        {/* Unlock Game */}
        {!isUnlocked && (
          <FlappyHeartGame onUnlock={() => setIsUnlocked(true)} />
        )}

        {/* Content Box - Only visible after unlock */}
        {isUnlocked && (
          <div className="unlocked-content animate-fade-in">
            <PhotoCollage />
            <SectionDivider />
            <SongDedication />
            <SectionDivider />
            <SecretVault />
            <SectionDivider />
            <BeatingHeart />
            <SectionDivider />
            <VideoPlayer />
            <SectionDivider />
            <LoveNote />
          </div>
        )}
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        color: '#880d1e',
        position: 'relative',
        zIndex: 10,
        fontWeight: 'bold'
      }}>
        <p>Made with all my heart for Nmii ❤️</p>
      </footer>
    </div>
  );
}

export default App;
