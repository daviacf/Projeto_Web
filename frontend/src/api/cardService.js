// src/api/cardService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Copiada do deckService.js para autenticar nossas requisições
const getAuthHeader = () => {
  const token = localStorage.getItem('jwt_token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Função para buscar os cartões de um baralho específico
export const getCardsByDeckId = (deckId) => {
  return axios.get(`${API_URL}/baralhos/${deckId}/cartoes`);
};

// --- NOVA FUNÇÃO ABAIXO ---
// Função para criar um novo cartão em um baralho
export const createCard = (deckId, frente, verso) => {
  return axios.post(`${API_URL}/baralhos/${deckId}/cartoes`, { frente, verso }, getAuthHeader());
};

export const deleteCard = (cardId) => {
    return axios.delete(`${API_URL}/cartoes/${cardId}`, getAuthHeader());
  };