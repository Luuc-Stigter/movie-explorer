import React from 'react';

function MovieCard({ movie }) {
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        <div className="movie-card">
            {movie.poster_path ? (
                <img src={posterUrl} alt={`Poster van ${movie.title}`} />
            ) : (
                <div className="no-poster">Geen poster beschikbaar</div>
            )}
            <h3>{movie.title}</h3>
            <p>Score: {movie.vote_average.toFixed(1)}</p>
        </div>
    );
}

export default MovieCard;