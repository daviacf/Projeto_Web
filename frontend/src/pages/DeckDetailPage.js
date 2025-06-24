// src/pages/DeckDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCardsByDeckId, createCard, updateCard, deleteCard } from '../api/cardService';
import './DeckDetailPage.css';

const DeckDetailPage = () => {
    const [cards, setCards] = useState([]);
    const [error, setError] = useState('');
    const { deckId } = useParams();

    // Estados do formulário de criação
    const [newCardFront, setNewCardFront] = useState('');
    const [newCardBack, setNewCardBack] = useState('');

    // Estados do modal de edição
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCard, setEditingCard] = useState(null);
    const [editingFront, setEditingFront] = useState('');
    const [editingBack, setEditingBack] = useState('');

    // Busca os cartões
    const fetchCards = async () => {
        if (deckId) {
            try {
                const response = await getCardsByDeckId(deckId);
                setCards(response.data);
            } catch (err) { setError('Não foi possível carregar os cartões.'); }
        }
    };

    useEffect(() => { fetchCards(); }, [deckId]);

    // Lógica de Criação
    const handleCreateCard = async (e) => {
        e.preventDefault();
        if (!deckId) return;
        try {
            await createCard(deckId, newCardFront, newCardBack);
            setNewCardFront(''); setNewCardBack('');
            fetchCards();
        } catch (err) { setError('Erro ao criar o cartão.'); }
    };

    // Lógica de Exclusão
    const handleDeleteCard = async (cardId) => {
        if (window.confirm('Tem certeza de que deseja excluir este cartão?')) {
            try {
                await deleteCard(cardId);
                fetchCards();
            } catch (err) { setError('Erro ao excluir o cartão.'); }
        }
    };

    // Lógica do Modal de Edição
    const handleOpenEditModal = (card) => {
        setEditingCard(card);
        setEditingFront(card.frente);
        setEditingBack(card.verso);
        setIsModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsModalOpen(false); setEditingCard(null);
    };

    const handleUpdateCard = async (e) => {
        e.preventDefault();
        if (!editingCard) return;
        try {
            await updateCard(editingCard.id, editingFront, editingBack);
            handleCloseEditModal();
            fetchCards();
        } catch (err) { setError('Erro ao atualizar o cartão.'); }
    };

    return (
        <div className="deck-detail-container">
            <Link to="/dashboard" className="back-link">&larr; Voltar para o Painel</Link>
            <h1>Cartões do Baralho</h1>

            {/* Formulário de Criação */}
            <div className="create-card-form">
                <h3>Adicionar Novo Cartão</h3>
                <form onSubmit={handleCreateCard}>
                    <textarea placeholder="Frente do cartão (pergunta)" value={newCardFront} onChange={(e) => setNewCardFront(e.target.value)} required />
                    <textarea placeholder="Verso do cartão (resposta)" value={newCardBack} onChange={(e) => setNewCardBack(e.target.value)} required />
                    <button type="submit">Adicionar Cartão</button>
                </form>
            </div>

            {error && <p className="error-message">{error}</p>}
            
            {/* Lista de Cartões */}
            <div className="cards-list">
                {cards.map(card => (
                    <div key={card.id} className="flashcard">
                        <div className="card-buttons">
                            <button onClick={() => handleOpenEditModal(card)} className="edit-button">✏️</button>
                            <button onClick={() => handleDeleteCard(card.id)} className="delete-button">X</button>
                        </div>
                        <div className="flashcard-inner">
                            <div className="flashcard-front"><p>{card.frente}</p></div>
                            <div className="flashcard-back"><p>{card.verso}</p></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Edição de Cartão */}
            {isModalOpen && editingCard && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Editar Cartão</h2>
                        <form onSubmit={handleUpdateCard}>
                            <label>Frente:</label>
                            <textarea value={editingFront} onChange={(e) => setEditingFront(e.target.value)} required />
                            <label>Verso:</label>
                            <textarea value={editingBack} onChange={(e) => setEditingBack(e.target.value)} required />
                            <div className="modal-actions">
                                <button type="submit" className="button-primary">Salvar</button>
                                <button type="button" onClick={handleCloseEditModal} className="button-secondary">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeckDetailPage;