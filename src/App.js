import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import MovieDetailPage from './pages/MovieDetailPage';

function App() {
    return (
        <>
            <NavBar />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/inloggen" element={<SignInPage />} />
                    <Route path="/registreren" element={<SignUpPage />} />
                    <Route path="/movie/:movieId" element={<MovieDetailPage />} />
                </Routes>
            </main>
        </>
    );
}

export default App;