// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuth, setIsAuth] = useState({
        isAuthenticated: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Check of er een token in Local Storage staat bij het laden van de app
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwt_decode(token);
            fetchUserData(decodedToken.sub, token);
        } else {
            setIsAuth({
                ...isAuth,
                status: 'done',
            });
        }
    }, []);

    async function login(username, password) {
        try {
            const response = await axios.post('https://api.datavortex.nl/movieexplorer/users/authenticate', {
                username: username,
                password: password,
            });

            const token = response.data.jwt;
            localStorage.setItem('token', token);
            const decodedToken = jwt_decode(token);

            await fetchUserData(decodedToken.sub, token, '/profiel');

        } catch (e) {
            console.error("Onjuiste email of wachtwoord", e);
        }
    }

    async function fetchUserData(username, token, redirectUrl) {
        try {
            const response = await axios.get(`https://api.datavortex.nl/movieexplorer/users/${username}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            setIsAuth({
                isAuthenticated: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.username,
                },
                status: 'done',
            });

            if (redirectUrl) {
                navigate(redirectUrl);
            }

        } catch (e) {
            console.error("Er ging iets mis met het ophalen van de gebruikersdata", e);
            logout();
        }
    }

    function logout() {
        localStorage.removeItem('token');
        setIsAuth({
            isAuthenticated: false,
            user: null,
            status: 'done',
        });
        navigate('/');
    }

    const contextData = {
        isAuth: isAuth.isAuthenticated,
        user: isAuth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'pending' ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;