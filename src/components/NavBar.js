import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './NavBar.css';
import SearchBar from './SearchBar'; // Importeer de SearchBar

function NavBar() {
    const { isAuth, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" id="brand-link" onClick={closeMenu}>Movie Explorer</Link>
            </div>

            <div className="search-bar-container">
                <SearchBar />
            </div>

            <div className="navbar-controls">
                <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                    {isAuth ? (
                        <>
                            <Link to="/profiel" onClick={closeMenu}>Profiel</Link>
                            <button type="button" onClick={() => { logout(); closeMenu(); }}>Uitloggen</button>
                        </>
                    ) : (
                        <>
                            <Link to="/inloggen" onClick={closeMenu}>Inloggen</Link>
                            <Link to="/registreren" onClick={closeMenu}>Registreren</Link>
                        </>
                    )}
                </div>

                <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                </button>
            </div>
        </nav>
    );
}

export default NavBar;