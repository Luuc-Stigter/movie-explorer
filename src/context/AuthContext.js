import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuth, setIsAuth] = useState({
        isAuthenticated: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (isAuth.isAuthenticated) {
            const storedFavorites = localStorage.getItem(`favorites_${isAuth.user.id}`);
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } else {
            setFavorites([]);
        }
    }, [isAuth.isAuthenticated]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
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

            const decodedToken = jwtDecode(token);

            await fetchUserData(decodedToken.sub, token, '/profiel');

        } catch (e) {
            console.error("Onjuiste email of wachtwoord", e);
            throw e;
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

    const addFavorite = (movie) => {
        const newFavorites = [...favorites, movie];
        setFavorites(newFavorites);
        localStorage.setItem(`favorites_${isAuth.user.id}`, JSON.stringify(newFavorites));
    };

    const removeFavorite = (movieId) => {
        const newFavorites = favorites.filter(fav => fav.id !== movieId);
        setFavorites(newFavorites);
        localStorage.setItem(`favorites_${isAuth.user.id}`, JSON.stringify(newFavorites));
    };

    const contextData = {
        isAuth: isAuth.isAuthenticated,
        user: isAuth.user,
        login: login,
        logout: logout,
        favorites,
        addFavorite,
        removeFavorite,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'pending' ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;