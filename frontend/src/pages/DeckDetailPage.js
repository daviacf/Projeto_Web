// src/pages/DeckDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCardsByDeckId, createCard, deleteCard } from '../api/cardService'; // Importe deleteCard
import './DeckDetailPage.css';

const DeckDetailPage = () => {
  // ... (estados existentes: cards, error, newCardFront, newCardBack)
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const { deckId } = useParams();
  const [newCardFront, setNewCardFront] = useState('');
  const [newCardBack, setNewCardBack] = useState('');

  const fetchCards = async () => { /* ... (função existente, sem alterações) ... */
    if (deckId) {
      try {
        const response = await getCardsByDeckId(deckId);
        setCards(response.data);
      } catch (err) {
        setError('Não foi possível carregar os cartões.');
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchCards();
  }, [deckId]);

  const handleCreateCard = async (e) => { /* ... (função existente, sem alterações) ... */
    e.preventDefault();
    if (!deckId) return;

    try {
      await createCard(deckId, newCardFront, newCardBack);
      setNewCardFront('');
      setNewCardBack('');
      fetchCards();
    } catch (err) {
      setError('Erro ao criar o cartão. Verifique se preencheu os campos.');
      console.error(err);
    }
  };

  // --- NOVA FUNÇÃO ABAIXO ---
  const handleDeleteCard = async (cardId) => {
    // Confirmação para evitar exclusões acidentais
    if (window.confirm('Tem certeza de que deseja excluir este cartão?')) {
      try {
        await deleteCard(cardId);
        fetchCards(); // Re-busca os cartões para atualizar a lista
      } catch (err) {
        setError('Erro ao excluir o cartão.');
        console.error(err);
      }
    }
  };

  return (
    <div className="deck-detail-container">
      {/* ... (código existente: link para voltar, título, formulário) ... */}
      <Link to="/dashboard" className="back-link">
        &larr; Voltar para o Painel
      </Link>
      <h1>Cartões do Baralho</h1>
      <div className="create-card-form">
        <h3>Adicionar Novo Cartão</h3>
        <form onSubmit={handleCreateCard}>
          <textarea
            placeholder="Frente do cartão (pergunta)"
            value={newCardFront}
            onChange={(e) => setNewCardFront(e.target.value)}
            required
          />
          <textarea
            placeholder="Verso do cartão (resposta)"
            value={newCardBack}
            onChange={(e) => setNewCardBack(e.target.value)}
            required
          />
          <button type="submit">Adicionar Cartão</button>
        </form>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="cards-list">
        {cards.length > 0 ? (
          cards.map(card => (
            // --- MODIFICAÇÃO ABAIXO ---
            <div key={card.id} className="flashcard">
              <button onClick={() => handleDeleteCard(card.id)} className="delete-button">X</button>
              <div className="flashcard-inner">
                <div className="flashcard-front"><p>{card.frente}</p></div>
                <div className="flashcard-back"><p>{card.verso}</p></div>
              </div>
            </div>
          ))
        ) : (
          <p>Este baralho ainda não tem cartões. Adicione o primeiro!</p>
        )}
      </div>
    </div>
  );
};

export default DeckDetailPage;