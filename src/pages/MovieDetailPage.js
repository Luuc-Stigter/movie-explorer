import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import tmdb from '../helpers/axios-tmdb';
import { AuthContext } from '../context/AuthContext';
import './MovieDetailPage.css';

function MovieDetailPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuth, favorites, addFavorite, removeFavorite } = useContext(AuthContext);

    const isFavorite = useMemo(() => {
        return favorites.some(fav => fav.id === parseInt(movieId));
    }, [favorites, movieId]);

    useEffect(() => {
        async function fetchMovie() {
            setLoading(true);
            setError(null);
            try {
                const response = await tmdb.get(`/movie/${movieId}`);
                setMovie(response.data);
                // TODO: Controleer hier of deze film al in de favorietenlijst van de gebruiker staat
            } catch (e) {
                setError('Kon de filmdetails niet ophalen.');
                console.error(e);
            }
            setLoading(false);
        }

        fetchMovie();
    }, [movieId]);

    const backdropUrl = useMemo(() => {
        return movie ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : '';
    }, [movie]);

    const posterUrl = useMemo(() => {
        return movie ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';
    }, [movie]);

    const handleToggleFavorite = () => {
        if (isAuth) {
            setIsFavorite(!isFavorite); // Toggle de state
            if (!isFavorite) {
                console.log(`Film ${movie.title} toegevoegd aan favorieten!`);
                // TODO: API call om film aan favorieten toe te voegen
            } else {
                console.log(`Film ${movie.title} verwijderd uit favorieten!`);
                // TODO: API call om film uit favorieten te verwijderen
            }
        } else {
            console.log("Log in om films aan je favorieten toe te voegen.");
            // TODO: Stuur gebruiker naar de inlogpagina
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
        </div>
    );
}

export default MovieDetailPage;