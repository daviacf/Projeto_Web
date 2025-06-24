
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('jwt_token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getCardsByDeckId = (deckId) => {
  return axios.get(`${API_URL}/baralhos/${deckId}/cartoes`);
};

export const createCard = (deckId, frente, verso) => {
  return axios.post(`${API_URL}/baralhos/${deckId}/cartoes`, { frente, verso }, getAuthHeader());
};


export const updateCard = (cardId, frente, verso) => {
  return axios.put(`${API_URL}/cartoes/${cardId}`, { frente, verso }, getAuthHeader());
};

export const deleteCard = (cardId) => {
  return axios.delete(`${API_URL}/cartoes/${cardId}`, getAuthHeader());
};