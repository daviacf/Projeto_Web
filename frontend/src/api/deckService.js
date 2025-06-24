// src/api/deckService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Função para obter o cabeçalho de autorização com o token
const getAuthHeader = () => {
  const token = localStorage.getItem('jwt_token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Função para buscar todos os baralhos
export const getAllDecks = () => {
  // A requisição GET não precisa do token neste caso, pois a rota é pública no back-end
  // Mas manteremos o padrão para futuras rotas que precisem
  return axios.get(`${API_URL}/baralhos`);
};

export const createDeck = (titulo, descricao) => {
    // Agora usamos o getAuthHeader para enviar o token
    return axios.post(`${API_URL}/baralhos`, { titulo, descricao }, getAuthHeader());
  };