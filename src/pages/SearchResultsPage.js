import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import tmdb from '../helpers/axios-tmdb';
import MovieCard from '../components/MovieCard';
import './HomePage.css';

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
            setResults([]);

            let endpoint;
            let params = {};

            if (genre) {
                endpoint = '/discover/movie';
                params = { with_genres: genre };
            } else if (query) {
                endpoint = '/search/movie';
                params = { query };
            } else {
                endpoint = '/movie/popular';
            }

            try {
                const response = await tmdb.get(endpoint, { params });
                let fetchedMovies = response.data.results;

                if (genre && query) {
                    fetchedMovies = fetchedMovies.filter(movie =>
                        movie.title.toLowerCase().includes(query.toLowerCase())
                    );
                }

                let finalTitle = '';
                const hasResults = fetchedMovies.length > 0;

                if (genre && query) {
                    finalTitle = `${hasResults ? 'Resultaten' : 'Geen resultaten'} voor "${query}" in geselecteerd genre`;
                } else if (genre) {
                    finalTitle = `${hasResults ? 'Resultaten' : 'Geen resultaten'} voor het geselecteerde genre`;
                } else if (query) {
                    finalTitle = `${hasResults ? 'Resultaten' : 'Geen resultaten'} voor "${query}"`;
                } else {
                    finalTitle = 'Populaire Films';
                }

                setPageTitle(finalTitle);
                setResults(fetchedMovies);

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