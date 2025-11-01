import { useState } from 'react';
import db from '../db';
import { id } from '@instantdb/react';

function TodoSection({ userId }) {
  const [todoText, setTodoText] = useState('');

  // Requête pour obtenir les todos de l'utilisateur
  const { isLoading, error, data } = db.useQuery({
    todos: {
      $: {
        where: {
          userId: userId,
        },
      },
    },
  });

  const addTodo = async (e) => {
    e.preventDefault();
    if (!todoText.trim()) return;

    try {
      const todoId = id();
      await db.transact([
        db.tx.todos[todoId].update({
          text: todoText,
          done: false,
          createdAt: Date.now(),
          userId: userId,
        }),
      ]);
      setTodoText('');
    } catch (err) {
      console.error('Erreur lors de l\'ajout du todo:', err);
      alert('Erreur lors de l\'ajout de la tâche');
    }
  };

  const toggleTodo = async (todoId, currentDone) => {
    try {
      await db.transact([
        db.tx.todos[todoId].update({
          done: !currentDone,
        }),
      ]);
    } catch (err) {
      console.error('Erreur lors de la mise à jour du todo:', err);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await db.transact([
        db.tx.todos[todoId].delete(),
      ]);
    } catch (err) {
      console.error('Erreur lors de la suppression du todo:', err);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isLoading) {
    return (
      <section className="section">
        <h2 className="section-title">
          <span className="section-icon">✅</span>
          To-Dos du jour
        </h2>
        <div className="loading">Chargement...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <h2 className="section-title">
          <span className="section-icon">✅</span>
          To-Dos du jour
        </h2>
        <div className="error-message">Erreur: {error.message}</div>
      </section>
    );
  }

  const todos = data?.todos || [];

  return (
    <section className="section">
      <h2 className="section-title">
        <span className="section-icon">✅</span>
        To-Dos du jour
      </h2>

      <form onSubmit={addTodo} className="todo-input-container">
        <input
          type="text"
          className="todo-input"
          placeholder="Ajouter une nouvelle tâche..."
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button type="submit" className="btn btn-add">
          +
        </button>
      </form>

      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-state">
            📋 Aucune tâche pour aujourd'hui.<br />
            Ajoutez-en une pour commencer !
          </div>
        ) : (
          todos
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((todo) => (
              <div key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  className="todo-checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id, todo.done)}
                />
                <span className={`todo-text ${todo.done ? 'completed' : ''}`}>
                  {todo.text}
                </span>
                <span className="todo-date">
                  {formatDate(todo.createdAt)}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="btn btn-delete"
                >
                  🗑️
                </button>
              </div>
            ))
        )}
      </div>
    </section>
  );
}

export default TodoSection;

