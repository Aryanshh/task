import React from 'react';
import HeartBackground from './components/HeartBackground';
import Hero from './components/Hero';
import PhotoCollage from './components/PhotoCollage';
import SecretVault from './components/SecretVault';
import VideoPlayer from './components/VideoPlayer';
import LoveNote from './components/LoveNote';
import BeatingHeart from './components/BeatingHeart';
import SectionDivider from './components/SectionDivider';
import './index.css'; // Ensure global styles are applied

function App() {
  return (
    <div className="app-container">
      <HeartBackground />

      <main>
        <Hero />
        <PhotoCollage />
        <SectionDivider />
        <SecretVault />
        <SectionDivider />
        <BeatingHeart />
        <SectionDivider />
        <VideoPlayer />
        <SectionDivider />
        <LoveNote />
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
