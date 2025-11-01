import { useState } from 'react';
import db from './db';
import AuthPage from './components/AuthPage';
import MainApp from './components/MainApp';

function App() {
  const { isLoading, user, error } = db.useAuth();

  if (isLoading) {
    return (
      <div className="app-container">
        <div className="loading">
          ⏳ Chargement...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error-message" style={{ margin: '40px' }}>
          Erreur de connexion: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {user ? <MainApp user={user} /> : <AuthPage />}
    </div>
  );
}

export default App;

