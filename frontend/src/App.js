// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
// Descomente a linha abaixo
import DashboardPage from './pages/DashboardPage'; 
import DeckDetailPage from './pages/DeckDetailPage';

const isAuthenticated = () => {
  return localStorage.getItem('jwt_token') !== null;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route 
          path="/dashboard" 
          element={<PrivateRoute><DashboardPage /></PrivateRoute>} 
        />
        {/* Rota nova e dinâmica para os detalhes do baralho */}
        <Route 
          path="/decks/:deckId" 
          element={<PrivateRoute><DeckDetailPage /></PrivateRoute>} 
        />
      </Routes>
    </Router>
  );
}

export default App;