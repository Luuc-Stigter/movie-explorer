import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthForm.css';

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        try {
            await axios.post('https://api.datavortex.nl/movieexplorer/users', {
                username: username,
                email: email,
                password: password,
                authorities: [{ authority: 'USER' }]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'movieexplorer:Uju1R18GcIFG5fRCZwzt',
                }
            });
            navigate('/inloggen');
        } catch (e) {
            console.error("Registratie mislukt", e);
            setError("Registratie mislukt. Probeer een andere gebruikersnaam of e-mailadres.");
        }
    }

    return (
        <div className="auth-form-page">
            <div className="form-container">
                <h1>Registreren</h1>
                <p>Maak een account om je favoriete films op te slaan.</p>
                <form onSubmit={handleSubmit} className="auth-form">
                    <label>
                        <span>Gebruikersnaam:</span>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </label>
                    <label>
                        <span>E-mailadres:</span>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                    <label>
                        <span>Wachtwoord:</span>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />
                    </label>
                    <button type="submit">Registreren</button>
                </form>
                {error && <div className="error-message">{error}</div>}
                <p className="switch-link">
                    Heb je al een account? <Link to="/inloggen">Log hier in</Link>.
                </p>
            </div>
        </div>
    );
}

export default SignUpPage;