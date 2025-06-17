import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import './ProfilePage.css';

function ProfilePage() {
    const { user, favorites } = useContext(AuthContext);

    return (
        <div className="profile-page">
            <div className="container">
                <h1>Welkom, {user.username}!</h1>
                <p>Dit is je persoonlijke profielpagina. Hieronder vind je jouw favoriete films.</p>

                <h2>Mijn Favorieten</h2>
                {favorites.length > 0 ? (
                    <div className="movie-grid">
                        {favorites.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <p>Je hebt nog geen films aan je favorieten toegevoegd.</p>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;