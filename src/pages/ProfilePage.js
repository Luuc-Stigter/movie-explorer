import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import './ProfilePage.css';

function ProfilePage() {
    const { user, favorites } = useContext(AuthContext);

    return (
        <div className="profile-page">
            <div className="container">
                <header className="profile-header">
                    <h1>Welkom, {user.username}!</h1>
                    <p>Dit is je persoonlijke dashboard. Hieronder vind je alle films die je als favoriet hebt gemarkeerd.</p>
                </header>

                <section className="favorites-section">
                    <h2>Mijn Favorieten</h2>
                    {favorites.length > 0 ? (
                        <div className="movie-grid">
                            {favorites.map(movie => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <p className="no-favorites-message">Je hebt nog geen films aan je favorieten toegevoegd. Klik op het '+ Voeg toe' hartje op een detailpagina om te beginnen!</p>
                    )}
                </section>
            </div>
        </div>
    );
}

export default ProfilePage;