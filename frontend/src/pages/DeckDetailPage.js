

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCardsByDeckId, createCard, updateCard, deleteCard } from '../api/cardService';
import { FiEdit, FiTrash2, FiPlusCircle, FiArrowLeft } from 'react-icons/fi';
import './DeckDetailPage.css';


const CardSkeleton = () => <div className="card-skeleton" />;

const DeckDetailPage = () => {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { deckId } = useParams();

    const [newCardFront, setNewCardFront] = useState('');
    const [newCardBack, setNewCardBack] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCard, setEditingCard] = useState(null);
    const [editingFront, setEditingFront] = useState('');
    const [editingBack, setEditingBack] = useState('');

    const fetchCards = async () => {
        if (deckId) {
            setIsLoading(true);
            try {
                const response = await getCardsByDeckId(deckId);
                setCards(response.data);
            } catch (err) { setError('Não foi possível carregar os cartões.'); }
            finally { setIsLoading(false); }
        }
    };

    useEffect(() => { fetchCards(); }, [deckId]);

    const handleCreateCard = async (e) => {
        e.preventDefault();
        if (!deckId) return;
        try {
            await createCard(deckId, newCardFront, newCardBack);
            setNewCardFront(''); setNewCardBack('');
            fetchCards();
        } catch (err) { setError('Erro ao criar o cartão.'); }
    };

    const handleDeleteCard = async (cardId) => {
        if (window.confirm('Tem certeza de que deseja excluir este cartão?')) {
            try {
                await deleteCard(cardId);
                fetchCards();
            } catch (err) { setError('Erro ao excluir o cartão.'); }
        }
    };

    const handleOpenEditModal = (card) => {
        setEditingCard(card);
        setEditingFront(card.frente);
        setEditingBack(card.verso);
        setIsModalOpen(true);
    };

    const handleCloseEditModal = () => { setIsModalOpen(false); setEditingCard(null); };

    const handleUpdateCard = async (e) => {
        e.preventDefault();
        if (!editingCard) return;
        try {
            await updateCard(editingCard.id, editingFront, editingBack);
            handleCloseEditModal();
            fetchCards();
        } catch (err) { setError('Erro ao atualizar o cartão.'); }
    };
    
    const renderCards = () => {
        if (isLoading) {
            return Array.from({ length: 4 }).map((_, index) => <CardSkeleton key={index} />);
        }
        if (cards.length === 0) {
            return (
                <div className="empty-state-cards">
                    <h3>Este baralho está vazio.</h3>
                    <p>Adicione seu primeiro cartão no formulário acima!</p>
                </div>
            );
        }
        return cards.map(card => (
            <div key={card.id} className="flashcard">
                <div className="card-buttons">
                    <button onClick={() => handleOpenEditModal(card)} className="icon-button edit-button" aria-label="Editar Cartão"><FiEdit /></button>
                    <button onClick={() => handleDeleteCard(card.id)} className="icon-button delete-button" aria-label="Excluir Cartão"><FiTrash2 /></button>
                </div>
                <div className="flashcard-inner">
                    <div className="flashcard-front"><p>{card.frente}</p></div>
                    <div className="flashcard-back"><p>{card.verso}</p></div>
                </div>
            </div>
        ));
    };

    return (
        <div className="deck-detail-container">
            <header className="deck-detail-header">
                <Link to="/dashboard" className="back-link">
                    <FiArrowLeft /> Voltar para o Painel
                </Link>
            </header>
            
            <div className="create-card-form-card">
                <h3><FiPlusCircle /> Adicionar Novo Cartão</h3>
                <form onSubmit={handleCreateCard} className="create-card-form">
                    <textarea placeholder="Frente do cartão (pergunta)" value={newCardFront} onChange={(e) => setNewCardFront(e.target.value)} required />
                    <textarea placeholder="Verso do cartão (resposta)" value={newCardBack} onChange={(e) => setNewCardBack(e.target.value)} required />
                    <button type="submit">Adicionar Cartão</button>
                </form>
            </div>

            {error && <p className="error-message">{error}</p>}
            
            <div className="cards-list">
                {renderCards()}
            </div>

            {isModalOpen && editingCard && (
                <div className="modal-overlay" onClick={handleCloseEditModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Editar Cartão</h2>
                        <form onSubmit={handleUpdateCard}>
                            <label>Frente:</label>
                            <textarea value={editingFront} onChange={(e) => setEditingFront(e.target.value)} required />
                            <label>Verso:</label>
                            <textarea value={editingBack} onChange={(e) => setEditingBack(e.target.value)} required />
                            <div className="modal-actions">
                                <button type="button" onClick={handleCloseEditModal} className="button-secondary">Cancelar</button>
                                <button type="submit" className="button-primary">Salvar Alterações</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeckDetailPage;