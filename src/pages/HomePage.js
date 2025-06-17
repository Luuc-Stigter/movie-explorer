// src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import tmdb from '../helpers/axios-tmdb';
import MovieCard from '../components/MovieCard';

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPopularMovies() {
            setLoading(true);
            setError(null);
            try {
                const response = await tmdb.get('/movie/popular');
                setMovies(response.data.results);
            } catch (e) {
                setError('Er is iets misgegaan bij het ophalen van de films. Probeer het later opnieuw.');
                console.error(e);
            }
            setLoading(false);
        }

        fetchPopularMovies();
    }, []);

    return (
        <div className="homepage">
            <h1>Populaire Films</h1>

            {loading && <p className="loading-message">Laden...</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="movie-grid">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;