// src/App.js

import React, { useContext } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

function HomePage() {
  return <h1>Welkom op de Homepagina!</h1>;
}

function ProfilePage() {
  const { user, logout } = useContext(AuthContext);
  return (
      <div>
        <h1>Profielpagina</h1>
        {user && <p>Welkom, {user.username}!</p>}
        <button onClick={logout}>Uitloggen</button>
      </div>
  );
}

// Een component voor beveiligde routes
function PrivateRoute({ children }) {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? children : <Navigate to="/inloggen" />;
}

function App() {
  const { isAuth } = useContext(AuthContext);

  return (
      <>
        <nav>
          <Link to="/">Home</Link> | {' '}
          {!isAuth ? (
              <>
                <Link to="/inloggen">Inloggen</Link> | {' '}
                <Link to="/registreren">Registreren</Link>
              </>
          ) : (
              <Link to="/profiel">Profiel</Link>
          )}
        </nav>
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
      </>
  );
}

export default App;