import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AuthForm.css'; // Importeer de gedeelde CSS

function SignInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Lokale error state
    const { login } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        try {
            await login(username, password);
        } catch (e) {
            setError("Inloggen mislukt. Controleer je gebruikersnaam en wachtwoord.");
            console.error("Inloggen mislukt vanuit de pagina", e);
        }
    }

    return (
        <div className="auth-form-page">
            <div className="form-container">
                <h1>Inloggen</h1>
                <p>Log in om je favorieten te bekijken.</p>
                <form onSubmit={handleSubmit} className="auth-form">
                    <label>
                        <span>Gebruikersnaam:</span>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </label>
                    <label>
                        <span>Wachtwoord:</span>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                    <button type="submit">Inloggen</button>
                </form>
                {error && <div className="error-message">{error}</div>}
                <p className="switch-link">
                    Heb je nog geen account? <Link to="/registreren">Registreer je hier</Link>.
                </p>
            </div>
        </div>
    );
}

export default SignInPage;