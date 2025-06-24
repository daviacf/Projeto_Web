// src/pages/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login } from '../api/authService';
import './AuthPage.css';

const AuthPage = () => {
    
    const [isLoginView, setIsLoginView] = useState(true);

    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');
    
    const navigate = useNavigate();

    const handleAuthAction = async (e) => {
        e.preventDefault();
        setMessage(''); // Limpa a mensagem anterior
        
        try {
            if (isLoginView) {
                // Lógica de Login
                const response = await login(email, senha);
                localStorage.setItem('jwt_token', response.data.token);
                navigate('/dashboard');
            } else {
                // Lógica de Cadastro
                const response = await register(nome, email, senha);
                setMessage(response.data.message + " Agora você pode fazer o login.");
                setIsLoginView(true); // Muda para a tela de login após o sucesso
            }
        } catch (error) {
            setMessage(error.response?.data?.error || error.response?.data?.message || 'Ocorreu um erro.');
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-card">
                <div className="auth-toggle">
                    <button onClick={() => setIsLoginView(true)} className={isLoginView ? 'active' : ''}>
                        Login
                    </button>
                    <button onClick={() => setIsLoginView(false)} className={!isLoginView ? 'active' : ''}>
                        Cadastro
                    </button>
                </div>

                <form onSubmit={handleAuthAction} className="auth-form">
                    <h2>{isLoginView ? 'Bem-vindo de volta!' : 'Crie sua conta'}</h2>
                    
                    {!isLoginView && (
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome completo" required />
                    )}

                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" required />
                    
                    <button type="submit" className="submit-btn">
                        {isLoginView ? 'Entrar' : 'Cadastrar'}
                    </button>
                    
                    {message && <p className="auth-message">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default AuthPage;