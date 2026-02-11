import React, { useState, useEffect } from 'react';
import './PhotoCollage.css';

import SectionKisses from './SectionKisses';

const PhotoCollage = () => {
    // Placeholder memories
    // Automatically import all images from the 'memories' folder
    const modules = import.meta.glob('../assets/memories/*.{png,jpg,jpeg,svg,webp,PNG,JPG,JPEG,SVG,WEBP}', { eager: true });

    // Convert to array
    const memoryImages = Object.values(modules).map((module) => module.default);

    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        // If we have no images, use placeholders, otherwise use the real images
        const initialPhotos = memoryImages.length > 0
            ? memoryImages.map((src, i) => ({
                id: i,
                src: src,
                caption: `Memory ${i + 1}` // default caption
            }))
            : Array.from({ length: 20 }).map((_, i) => ({
                id: i + 1,
                src: `https://placehold.co/400x${300 + (i % 3) * 50}/ffb4a2/white?text=Memory+${i + 1}`,
                caption: `Placeholder ${i + 1}`
            }));

        setPhotos(initialPhotos);
    }, []); // Run once on mount

    const shufflePhotos = () => {
        setPhotos(prevPhotos => {
            const shuffled = [...prevPhotos];
            // Fisher-Yates shuffle
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        });
    };

    return (
        <section className="collage-section container" style={{ position: 'relative' }}>
            <SectionKisses />
            <h2>Captured Moments 📸</h2>

            <button className="shuffle-btn" onClick={shufflePhotos}>
                Shuffle Memories 🔀
            </button>

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
