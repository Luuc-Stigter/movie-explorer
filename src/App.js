// src/App.js

import React, { useContext } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

// Voorbeeld van een homepagina
function HomePage() {
  return <h1>Welkom op de Homepagina!</h1>;
}

// Voorbeeld van een profielpagina
function ProfilePage() {
  const { user, logout } = useContext(AuthContext);

  return (
      <div>
        <h1>Profielpagina</h1>
        {/* Zorg ervoor dat user bestaat voordat je de property aanroept */}
        {user && <p>Welkom terug, {user.username}!</p>}
        <button type="button" onClick={logout}>Uitloggen</button>
      </div>
  );
}

// Component voor beveiligde routes (Private Routes)
function PrivateRoute({ children }) {
  const { isAuth } = useContext(AuthContext);
  return isAuth === true ? children : <Navigate to="/inloggen" />;
}

// Hoofd App component
function App() {
  const { isAuth } = useContext(AuthContext);

  return (
      <>
        <nav>
          <Link to="/">Home</Link>
          {isAuth === true ? (
              <>
                {' | '}
                <Link to="/profiel">Profiel</Link>
              </>
          ) : (
              <>
                {' | '}
                <Link to="/inloggen">Inloggen</Link>
                {' | '}
                <Link to="/registreren">Registreren</Link>
              </>
          )}
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inloggen" element={<SignInPage />} />
            <Route path="/registreren" element={<SignUpPage />} />
            <Route
                path="/profiel"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
            />
          </Routes>
        </main>
      </>
  );
}

export default App;