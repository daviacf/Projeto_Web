// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { getAllDecks, createDeck } from '../api/deckService'; // Importe createDeck
import './DashboardPage.css';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState('');

  // Estados para o novo formulário de baralho
  const [newDeckTitle, setNewDeckTitle] = useState('');
  const [newDeckDesc, setNewDeckDesc] = useState('');

  const fetchDecks = async () => {
    try {
      const response = await getAllDecks();
      setDecks(response.data);
    } catch (err) {
      setError('Não foi possível carregar os baralhos.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  // Função para lidar com a criação de um novo baralho
  const handleCreateDeck = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    try {
      await createDeck(newDeckTitle, newDeckDesc);
      // Limpa os campos e atualiza a lista de baralhos
      setNewDeckTitle('');
      setNewDeckDesc('');
      fetchDecks(); // Busca a lista atualizada de baralhos
    } catch (err) {
      setError('Erro ao criar o baralho. Verifique se o título foi preenchido.');
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Painel de Baralhos</h1>
        <button onClick={() => { /* Lógica para deslogar */ }}>Sair</button>
      </header>

      {/* Formulário de Criação de Baralho */}
      <div className="create-deck-form">
        <h3>Criar Novo Baralho</h3>
        <form onSubmit={handleCreateDeck}>
          <input
            type="text"
            placeholder="Título do baralho"
            value={newDeckTitle}
            onChange={(e) => setNewDeckTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Descrição do baralho"
            value={newDeckDesc}
            onChange={(e) => setNewDeckDesc(e.target.value)}
          />
          <button type="submit">Criar Baralho</button>
        </form>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="decks-list">
        {/* O código para listar os baralhos continua o mesmo */}
        {decks.length > 0 ? (
          decks.map(deck => (
            <Link to={`/decks/${deck.id}`} key={deck.id} className="deck-card-link">
    <div className="deck-card">
        <h2>{deck.titulo}</h2>
        <p>{deck.descricao}</p>
        <small>Autor: {deck.autor}</small>
    </div>
</Link>
          ))
        ) : (
          <p>Nenhum baralho encontrado. Crie o primeiro!</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;