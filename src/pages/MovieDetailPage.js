import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import tmdb from '../helpers/axios-tmdb';
import { AuthContext } from '../context/AuthContext';
import TrailerPlayer from '../components/TrailerPlayer';
import './MovieDetailPage.css';

function MovieDetailPage() {
    const { movieId } = useParams();
    const { isAuth, favorites, addFavorite, removeFavorite } = useContext(AuthContext);

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [trailers, setTrailers] = useState([]);

    const isFavorite = useMemo(() => {
        return favorites.some(fav => fav.id === parseInt(movieId));
    }, [favorites, movieId]);

    useEffect(() => {
        async function fetchMovieData() {
            setLoading(true);
            setError(null);
            try {
                const [detailsResponse, videosResponse] = await Promise.all([
                    tmdb.get(`/movie/${movieId}`),
                    tmdb.get(`/movie/${movieId}/videos`)
                ]);

                setMovie(detailsResponse.data);

                const youtubeTrailers = videosResponse.data.results.filter(video =>
                    video.site === 'YouTube' && video.type === 'Trailer'
                );
                setTrailers(youtubeTrailers);

            } catch (e) {
                setError('Kon de filmdata niet ophalen.');
                console.error(e);
            }
            setLoading(false);
        }

        fetchMovieData();
    }, [movieId]);

    const backdropUrl = useMemo(() => {
        return movie ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : '';
    }, [movie]);

    const posterUrl = useMemo(() => {
        return movie ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';
    }, [movie]);

    const handleToggleFavorite = () => {
        if (isFavorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    };

    if (loading) return <p className="loading-message">Laden...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!movie) return null;

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
                    <div className="title-section">
                        <h1>{movie.title}</h1>
                        {isAuth && (
                            <button
                                className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
                                onClick={handleToggleFavorite}
                            >
                                {isFavorite ? '✓ Favoriet' : '+ Voeg toe'}
                            </button>
                        )}
                    </div>
                    <p className="tagline"><em>{movie.tagline}</em></p>
                    <div className="genres">
                        {movie.genres.map(genre => <span key={genre.id} className="genre-tag">{genre.name}</span>)}
                    </div>
                    <h3>Overzicht</h3>
                    <p>{movie.overview}</p>
                    <div className="extra-info">
                        <div><strong>Score:</strong> {movie.vote_average.toFixed(1)}/10</div>
                        <div><strong>Releasedatum:</strong> {new Date(movie.release_date).toLocaleDateString('nl-NL')}</div>
                        <div><strong>Duur:</strong> {movie.runtime} minuten</div>
                    </div>
                </div>
            </div>

            {trailers.length > 0 && (
                <div className="container trailer-section">
                    <h3>Trailers</h3>
                    {trailers.map(trailer => (
                        <TrailerPlayer key={trailer.id} videoKey={trailer.key} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MovieDetailPage;