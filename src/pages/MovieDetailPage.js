import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tmdb from '../helpers/axios-tmdb';
import './MovieDetailPage.css';

function MovieDetailPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMovie() {
            setLoading(true);
            setError(null);
            try {
                const response = await tmdb.get(`/movie/${movieId}`);
                setMovie(response.data);
            } catch (e) {
                setError('Kon de filmdetails niet ophalen.');
                console.error(e);
            }
            setLoading(false);
        }

        fetchMovie();
    }, [movieId]);

    if (loading) return <p className="loading-message">Laden...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!movie) return null;

    const backdropUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        <div className="detail-page">
            <header className="detail-header" style={{ backgroundImage: `url(${backdropUrl})` }}>
                <div className="header-overlay"></div>
            </header>
            <div className="container detail-content">
                <div className="detail-poster">
                    <img src={posterUrl} alt={`Poster van ${movie.title}`} />
                </div>
                <div className="detail-info">
                    <h1>{movie.title}</h1>
                    <p className="tagline"><em>{movie.tagline}</em></p>
                    <div className="genres">
                        {movie.genres.map(genre => <span key={genre.id} className="genre-tag">{genre.name}</span>)}
                    </div>
                    <h3>Overzicht</h3>
                    <p>{movie.overview}</p>
                    <div className="extra-info">
                        <div><strong>Score:</strong> {movie.vote_average.toFixed(1)}/10</div>
                        <div><strong>Releasedatum:</strong> {new Date(movie.release_date).toLocaleDateString('nl-NL')}</div>
                        <div><strong>Speelduur:</strong> {movie.runtime} minuten</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetailPage;