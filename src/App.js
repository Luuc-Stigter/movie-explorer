// src/App.js
import React, { useContext } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

// Eenvoudige homepage voor alle bezoekers
function HomePage() {
  return (
      <section>
        <h1>Welkom op de Homepagina!</h1>
        <p>Blader rond, of log in om je favorieten te beheren.</p>
      </section>
  );
}

// Alleen toegankelijk voor ingelogde gebruikers
function ProfilePage() {
  const { user, logout } = useContext(AuthContext);

  return (
      <section>
        <h1>Profielpagina</h1>
        {user
            ? <p>Welkom terug, <strong>{user.username}</strong>!</p>
            : <p>Geen gebruikersdata beschikbaar.</p>
        }
        <button onClick={logout}>Uitloggen</button>
      </section>
  );
}

// Wrapper voor private routes
function PrivateRoute({ children }) {
  const { isAuth } = useContext(AuthContext);
  return isAuth
      ? children
      : <Navigate to="/inloggen" replace />;
}

// Hoofdcomponent met navigatie en routing
export default function App() {
  const { isAuth } = useContext(AuthContext);

  return (
      <>
        {/* Globale navigatiebalk */}
        <nav>
          <Link to="/">Home</Link>
          {isAuth
              ? <> {' | '}<Link to="/profiel">Profiel</Link> </>
              : (
                  <>
                    {' | '}<Link to="/inloggen">Inloggen</Link>
                    {' | '}<Link to="/registreren">Registreren</Link>
                  </>
              )
          }
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
            {/* 404-fallback */}
            <Route path="*" element={<h2>Pagina niet gevonden</h2>} />
          </Routes>
        </main>
      </>
  );
}
