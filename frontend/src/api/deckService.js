import axios from 'axios';

const API_URL = 'http://localhost:5000/api';


const getAuthHeader = () => {
  const token = localStorage.getItem('jwt_token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAllDecks = () => {
  
  return axios.get(`${API_URL}/baralhos`);
};

export const createDeck = (titulo, descricao) => {
    
    return axios.post(`${API_URL}/baralhos`, { titulo, descricao }, getAuthHeader());
  };

  export const deleteDeck = (deckId) => {
    return axios.delete(`${API_URL}/baralhos/${deckId}`, getAuthHeader());
  };
  export const updateDeck = (deckId, titulo, descricao) => {
    return axios.put(`${API_URL}/baralhos/${deckId}`, { titulo, descricao }, getAuthHeader());
  };
  