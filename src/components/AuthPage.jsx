import { useState } from 'react';
import db from '../db';

function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sentEmail, setSentEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!email || !email.includes('@')) {
        throw new Error('Veuillez entrer une adresse email valide');
      }

      await db.auth.sendMagicCode({ email });
      setSentEmail(email);
      setError('');
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de l\'envoi du code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!code || code.length !== 6) {
        throw new Error('Veuillez entrer le code à 6 chiffres');
      }

      await db.auth.signInWithMagicCode({ email: sentEmail, code });
      // La connexion se fait automatiquement, App.jsx gérera la redirection
    } catch (err) {
      setError(err.message || 'Code invalide. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">
        {sentEmail ? '🔐 Vérification' : (isSignIn ? '👋 Bienvenue !' : '🎉 Créer un compte')}
      </h1>
      <p className="auth-subtitle">
        {sentEmail 
          ? `Un code à 6 chiffres a été envoyé à ${sentEmail}`
          : (isSignIn 
              ? 'Connectez-vous pour gérer vos tâches et notes' 
              : 'Inscrivez-vous pour commencer à organiser votre journée')}
      </p>

      {error && (
        <div className="error-message" style={{ marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {!sentEmail ? (
        // Formulaire pour entrer l'email
        <form onSubmit={handleSendCode} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading 
              ? '⏳ Envoi...' 
              : '✉️ Envoyer le code'}
          </button>
        </form>
      ) : (
        // Formulaire pour entrer le code de vérification
        <form onSubmit={handleVerifyCode} className="auth-form">
          <div className="form-group">
            <label htmlFor="code" className="form-label">
              Code de vérification
            </label>
            <input
              id="code"
              type="text"
              className="form-input"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              required
              disabled={isLoading}
              maxLength={6}
              style={{ fontSize: '24px', textAlign: 'center', letterSpacing: '8px' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading 
              ? '⏳ Vérification...' 
              : '✅ Vérifier le code'}
          </button>

          <button 
            type="button"
            onClick={() => {
              setSentEmail('');
              setCode('');
              setError('');
            }}
            className="btn"
            style={{ marginTop: '10px', background: '#6b7280', color: 'white' }}
            disabled={isLoading}
          >
            ← Changer d'email
          </button>
        </form>
      )}

      {!sentEmail && (
        <div className="auth-toggle">
          {isSignIn ? (
            <>
              Pas encore de compte ?{' '}
              <button onClick={() => setIsSignIn(false)}>
                Créer un compte
              </button>
            </>
          ) : (
            <>
              Déjà un compte ?{' '}
              <button onClick={() => setIsSignIn(true)}>
                Se connecter
              </button>
            </>
          )}
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '15px', background: '#f0f9ff', borderRadius: '10px', fontSize: '13px', color: '#0369a1' }}>
        <strong>ℹ️ Comment ça marche ?</strong>
        <p style={{ marginTop: '8px', lineHeight: '1.5' }}>
          {sentEmail 
            ? 'Vérifiez votre boîte mail et entrez le code à 6 chiffres que vous avez reçu.'
            : 'InstantDB utilise l\'authentification par code. Vous recevrez un code à 6 chiffres par email pour vous connecter en toute sécurité !'}
        </p>
      </div>
    </div>
  );
}

export default AuthPage;

