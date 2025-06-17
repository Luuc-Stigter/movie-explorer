import React from 'react';
import './TrailerPlayer.css';

function TrailerPlayer({ videoKey }) {
    return (
        <div className="trailer-player-wrapper">
            <iframe
                src={`https://www.youtube.com/embed/${videoKey}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default TrailerPlayer;