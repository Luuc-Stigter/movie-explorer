import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './NavBar.css';

function NavBar() {
    const { isAuth, logout, user } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" id="brand-link">Movie Explorer</Link>
            </div>
            <div className="navbar-links">
                {isAuth ? (
                    <>
                        {user && <span className="welcome-message">Welkom, {user.username}</span>}
                        <button type="button" onClick={logout}>Uitloggen</button>
                    </>
                ) : (
                    <>
                        <Link to="/inloggen">Inloggen</Link>
                        <Link to="/registreren">Registreren</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;