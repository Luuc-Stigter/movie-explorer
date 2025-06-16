import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null); // Reset error state

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

            // Navigeer naar de inlogpagina na succesvolle registratie
            navigate('/inloggen');

        } catch (e) {
            console.error("Registratie mislukt", e);
            setError("Er is iets misgegaan bij de registratie. Probeer een andere gebruikersnaam.");
        }
    }

    return (
        <div>
            <h1>Registreren</h1>
            <p>Maak een account aan om films aan je favorieten toe te voegen.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username-field">
                    Gebruikersnaam:
                    <input type="text" id="username-field" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label htmlFor="email-field">
                    Email:
                    <input type="email" id="email-field" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label htmlFor="password-field">
                    Wachtwoord:
                    <input type="password" id="password-field" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Registreren</button>
            </form>
            <p>Heb je al een account? <Link to="/inloggen">Log hier in</Link>.</p>
        </div>
    );
}

export default SignUpPage;