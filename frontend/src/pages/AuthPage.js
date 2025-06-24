// src/pages/AuthPage.js
import React, { useState } from 'react';
import { register, login } from '../api/authService';
import './AuthPage.css';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  // Estados para o formulário de registro
  const [regNome, setRegNome] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regSenha, setRegSenha] = useState('');

  // Estados para o formulário de login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');
  
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(regNome, regEmail, regSenha);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error || 'Erro ao cadastrar.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(loginEmail, loginSenha);
      localStorage.setItem('jwt_token', response.data.token);
      navigate('/dashboard'); // Redireciona para o painel
    } catch (error) {
      setMessage(error.response.data.message || 'Erro ao fazer login.');
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h2>Cadastro</h2>
        <form onSubmit={handleRegister}>
          <input type="text" value={regNome} onChange={(e) => setRegNome(e.target.value)} placeholder="Nome" required />
          <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={regSenha} onChange={(e) => setRegSenha(e.target.value)} placeholder="Senha" required />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={loginSenha} onChange={(e) => setLoginSenha(e.target.value)} placeholder="Senha" required />
          <button type="submit">Entrar</button>
        </form>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AuthPage;