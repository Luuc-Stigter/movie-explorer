import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import tmdb from '../helpers/axios-tmdb';
import MovieCard from '../components/MovieCard';
import './HomePage.css'; // We hergebruiken deze CSS

function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const genre = searchParams.get('genre');

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageTitle, setPageTitle] = useState('');

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);

            let endpoint;
            let params = {};

            if (genre) {
                endpoint = '/discover/movie';
                params = { with_genres: genre };
                setPageTitle('Gefilterde Films');
            } else if (query) {
                endpoint = '/search/movie';
                params = { query };
                setPageTitle(`Zoekresultaten voor "${query}"`);
            } else {
                endpoint = '/movie/popular';
                setPageTitle('Populaire Films');
            }

            try {
                const response = await tmdb.get(endpoint, { params });
                setResults(response.data.results);
            } catch (e) {
                setError('Er ging iets mis bij het ophalen van de data.');
                console.error(e);
            }
            setLoading(false);
        }

        fetchData();
    }, [query, genre]);

    return (
        <div className="homepage">
            <div className="container">
                <h1>{pageTitle}</h1>
                {loading && <p className="loading-message">Bezig met laden...</p>}
                {error && <p className="error-message">{error}</p>}

                {!loading && results.length === 0 && !error && (
                    <p>Geen films gevonden.</p>
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