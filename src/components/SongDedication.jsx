import React from 'react';
import './SongDedication.css';

// Importing song images
import song1 from '../assets/songs/1.PNG';
import song2 from '../assets/songs/2.PNG';
import song3 from '../assets/songs/3.PNG';
import song4 from '../assets/songs/4.PNG';

// Importing decorative instruments (legacy: flute removed)
import SectionGuitars from './SectionGuitars';

const SongDedication = () => {
    // Real songs
    const songs = [
        { id: 1, title: "Dedication 1", src: song1 },
        { id: 2, title: "Dedication 2", src: song2 },
        { id: 3, title: "Dedication 3", src: song3 },
        { id: 4, title: "Dedication 4", src: song4 },
    ];

    return (
        <section className="song-section container" style={{ position: 'relative' }}>
            {/* Floating Guitar Animation */}
            <SectionGuitars />

            <h2>Songs for You 🎵</h2>
            <p className="song-subtitle">A few tunes that remind me of us...</p>

            <div className="song-scroll-container">
                {songs.map(song => (
                    <div key={song.id} className="song-card">
                        <img src={song.src} alt={song.title} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SongDedication;
