import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tmdb from '../helpers/axios-tmdb';
import './SearchBar.css';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();
        if (query.trim()) {
            params.append('query', query.trim());
        }
        if (selectedGenre) {
            params.append('genre', selectedGenre);
        }

        if (params.toString()) {
            navigate(`/search?${params.toString()}`);
        } else {
            navigate('/');
        }
    };

    return (
        <form className="search-and-filter-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Zoek op titel..."
            />
            <select
                className="genre-select"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
            >
                <option value="">Alle Genres</option>
                {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
            <button type="submit" className="search-button">Zoek</button>
        </form>
    );
}

export default SearchBar;