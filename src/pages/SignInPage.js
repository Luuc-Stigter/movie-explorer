import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function SignInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        login(username, password);
    }

    return (
        <div>
            <h1>Inloggen</h1>
            <p>Log in om je favorieten te bekijken.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username-field">
                    Gebruikersnaam:
                    <input type="text" id="username-field" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label htmlFor="password-field">
                    Wachtwoord:
                    <input type="password" id="password-field" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Inloggen</button>
            </form>
            <p>Heb je nog geen account? <Link to="/registreren">Registreer je hier</Link>.</p>
        </div>
    );
}

export default SignInPage;