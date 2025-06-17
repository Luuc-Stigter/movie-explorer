// src/components/SearchBar.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tmdb from '../helpers/axios-tmdb';
import './SearchBar.css';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchGenres() {
            try {
                const response = await tmdb.get('/genre/movie/list');
                setGenres(response.data.genres);
            } catch (e) {
                console.error("Kon genres niet ophalen", e);
            }
        }
        fetchGenres();
    }, []);

    const handleTextSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query)}`);
            setQuery('');
        }
    };

    const handleGenreFilter = (e) => {
        const genreId = e.target.value;
        if (genreId) {
            navigate(`/search?genre=${genreId}`);
        } else {
            // Optioneel: navigeer naar de homepagina als "Alle Genres" is gekozen
            navigate('/');
        }
    };

    return (
        // De form-tag is nu alleen voor de tekst-zoekopdracht
        <form className="search-and-filter-bar" onSubmit={handleTextSearch}>
            <input
                type="text"
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Zoek op titel..."
            />
            <button type="submit" className="search-button">Zoek</button>

            {/* De genre-filter staat naast de zoekbalk */}
            <select className="genre-select" onChange={handleGenreFilter} defaultValue="">
                <option value="" disabled>... of filter op genre</option>
                <option value="">Alle Genres</option>
                {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </form>
    );
}

export default SearchBar;