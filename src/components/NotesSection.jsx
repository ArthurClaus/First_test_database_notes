import { useState } from 'react';
import db from '../db';
import { id } from '@instantdb/react';

function NotesSection({ userId }) {
  const [noteContent, setNoteContent] = useState('');
  const [noteDate, setNoteDate] = useState('');

  // Requête pour obtenir les notes de l'utilisateur
  const { isLoading, error, data } = db.useQuery({
    notes: {
      $: {
        where: {
          userId: userId,
        },
      },
    },
  });

  const addNote = async (e) => {
    e.preventDefault();
    if (!noteContent.trim() || !noteDate) {
      alert('Veuillez remplir le contenu et la date de la note');
      return;
    }

    try {
      const noteId = id();
      const selectedDate = new Date(noteDate).getTime();
      
      await db.transact([
        db.tx.notes[noteId].update({
          content: noteContent,
          date: selectedDate,
          createdAt: Date.now(),
          userId: userId,
        }),
      ]);
      
      setNoteContent('');
      setNoteDate('');
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la note:', err);
      alert('Erreur lors de l\'ajout de la note');
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await db.transact([
        db.tx.notes[noteId].delete(),
      ]);
    } catch (err) {
      console.error('Erreur lors de la suppression de la note:', err);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (isLoading) {
    return (
      <section className="section">
        <h2 className="section-title">
          <span className="section-icon">📅</span>
          Notes pour les jours à venir
        </h2>
        <div className="loading">Chargement...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <h2 className="section-title">
          <span className="section-icon">📅</span>
          Notes pour les jours à venir
        </h2>
        <div className="error-message">Erreur: {error.message}</div>
      </section>
    );
  }

  const notes = data?.notes || [];

  return (
    <section className="section">
      <h2 className="section-title">
        <span className="section-icon">📅</span>
        Notes pour les jours à venir
      </h2>

      <form onSubmit={addNote} className="note-form">
        <textarea
          className="note-textarea"
          placeholder="Écrivez votre note ici..."
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        <input
          type="date"
          className="note-date-input"
          value={noteDate}
          onChange={(e) => setNoteDate(e.target.value)}
          min={getTodayDate()}
        />
        <button type="submit" className="btn btn-primary">
          💾 Enregistrer la note
        </button>
      </form>

      <div className="note-list">
        {notes.length === 0 ? (
          <div className="empty-state">
            📝 Aucune note enregistrée.<br />
            Créez une note pour un jour futur !
          </div>
        ) : (
          notes
            .sort((a, b) => a.date - b.date)
            .map((note) => (
              <div key={note.id} className="note-item">
                <div className="note-header">
                  <span className="note-date-badge">
                    📅 {formatDate(note.date)}
                  </span>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="btn btn-delete"
                  >
                    🗑️
                  </button>
                </div>
                <div className="note-content">
                  {note.content}
                </div>
              </div>
            ))
        )}
      </div>
    </section>
  );
}

export default NotesSection;

