
import axios from 'axios';


const API_URL = 'http://localhost:5000/api';

export const register = (nome, email, senha) => {
  return axios.post(`${API_URL}/usuarios`, {
    nome,
    email,
    senha,
  });
};

export const login = (email, senha) => {
  return axios.post(`${API_URL}/login`, {
    email,
    senha,
  });
};