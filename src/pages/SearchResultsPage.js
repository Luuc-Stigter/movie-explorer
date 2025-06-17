// src/pages/SearchResultsPage.js

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import tmdb from '../helpers/axios-tmdb';
import MovieCard from '../components/MovieCard';
import './HomePage.css';

function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query) return;

        async function fetchSearchResults() {
            setLoading(true);
            setError(null);
            try {
                const response = await tmdb.get('/search/movie', {
                    params: { query }
                });
                setResults(response.data.results);
            } catch (e) {
                setError('Er ging iets mis bij het zoeken. Probeer het opnieuw.');
                console.error(e);
            }
            setLoading(false);
        }

        fetchSearchResults();
    }, [query]);

    return (
        <div className="homepage">
            <div className="container">
                <h1 className="search-title">Zoekresultaten voor "{query}"</h1>

                {loading && <p className="loading-message">Bezig met zoeken...</p>}
                {error && <p className="error-message">{error}</p>}

                {!loading && results.length === 0 && !error && (
                    <p>Geen films gevonden die overeenkomen met je zoekopdracht.</p>
                )}

                <div className="movie-grid">
                    {results.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchResultsPage;