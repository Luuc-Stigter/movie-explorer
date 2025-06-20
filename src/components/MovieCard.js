import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

function MovieCard({ movie }) {
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        <Link to={`/movie/${movie.id}`} className="movie-card-link">
            <div className="movie-card">
                {movie.poster_path ? (
                    <img src={posterUrl} alt={`Poster van ${movie.title}`} />
                ) : (
                    <div className="no-poster">Geen poster beschikbaar</div>
                )}
                <div className="card-content">
                    <h3>{movie.title}</h3>
                    <p>Score: {movie.vote_average.toFixed(1)}</p>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;