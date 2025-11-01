import TodoSection from './TodoSection';
import NotesSection from './NotesSection';
import db from '../db';

function MainApp({ user }) {
  const handleSignOut = async () => {
    try {
      await db.auth.signOut();
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    }
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1 className="header-title">📝 Mes Notes & To-Dos</h1>
        <div className="header-user">
          <span>👤 {user.email}</span>
          <button onClick={handleSignOut} className="btn btn-danger">
            🚪 Déconnexion
          </button>
        </div>
      </header>

      <div className="content">
        <TodoSection userId={user.id} />
        <NotesSection userId={user.id} />
      </div>
    </div>
  );
}

export default MainApp;

