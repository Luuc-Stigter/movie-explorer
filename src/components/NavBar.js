import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './NavBar.css';

function NavBar() {
    const { isAuth, logout, user } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" id="brand-link">Movie Explorer</Link>
            </div>

            <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
                <span className="hamburger-bar"></span>
                <span className="hamburger-bar"></span>
                <span className="hamburger-bar"></span>
            </button>

            <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                {isAuth ? (
                    <>
                        {user && <span className="welcome-message-mobile">Welkom, {user.username}</span>}
                        <Link to="/profiel" onClick={() => setIsMenuOpen(false)}>Profiel</Link>
                        <button type="button" onClick={() => { logout(); setIsMenuOpen(false); }}>Uitloggen</button>
                    </>
                ) : (
                    <>
                        <Link to="/inloggen" onClick={() => setIsMenuOpen(false)}>Inloggen</Link>
                        <Link to="/registreren" onClick={() => setIsMenuOpen(false)}>Registreren</Link>
                    </>
                )}
            </div>

            {isAuth && user && <span className="welcome-message-desktop">Welkom, {user.username}</span>}
        </nav>
    );
}

export default NavBar;