import React from 'react';
import './PhotoCollage.css';

const PhotoCollage = () => {
    // Placeholder memories
    const photos = Array.from({ length: 20 }).map((_, i) => ({
        id: i + 1,
        src: `https://placehold.co/400x${300 + (i % 3) * 50}/ffb4a2/white?text=Memory+${i + 1}`,
        caption: `Memory ${i + 1}`
    }));

    return (
        <section className="collage-section container">
            <h2>Captured Moments 📸</h2>
            <div className="collage-grid">
                {photos.map(photo => (
                    <div key={photo.id} className="photo-card">
                        <img src={photo.src} alt={photo.caption} />

                        <div className="overlay">
                            <span>{photo.caption}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PhotoCollage;
