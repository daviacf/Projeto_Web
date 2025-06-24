

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllDecks, createDeck, deleteDeck, updateDeck } from '../api/deckService';
import { FiEdit, FiTrash2, FiLogOut, FiPlusCircle } from 'react-icons/fi';
import './DashboardPage.css';

// Componente para o esqueleto de carregamento
const DeckCardSkeleton = () => (
    <div className="deck-card-skeleton">
        <div className="skeleton-line title"></div>
        <div className="skeleton-line desc"></div>
        <div className="skeleton-line desc short"></div>
    </div>
);

const DashboardPage = () => {
    const [decks, setDecks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [newDeckTitle, setNewDeckTitle] = useState('');
    const [newDeckDesc, setNewDeckDesc] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDeck, setEditingDeck] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [editingDesc, setEditingDesc] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const navigate = useNavigate();

    const fetchDecks = async () => {
        setIsLoading(true);
        try {
            const response = await getAllDecks();
            setDecks(response.data);
        } catch (err) {
            setError('Não foi possível carregar os baralhos.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchDecks(); }, []);

    const handleCreateDeck = async (e) => {
        e.preventDefault();
        try {
            await createDeck(newDeckTitle, newDeckDesc);
            setNewDeckTitle(''); setNewDeckDesc('');
            setShowCreateForm(false);
            fetchDecks();
        } catch (err) { setError('Erro ao criar o baralho.'); }
    };

    const handleDeleteDeck = async (e, deckId) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm('Tem certeza que deseja excluir este baralho e todos os seus cartões?')) {
            try {
                await deleteDeck(deckId);
                fetchDecks();
            } catch (err) { setError('Erro ao excluir o baralho.'); }
        }
    };
    
    const handleOpenModal = (e, deck) => {
        e.preventDefault();
        e.stopPropagation();
        setEditingDeck(deck);
        setEditingTitle(deck.titulo);
        setEditingDesc(deck.descricao);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingDeck(null);
    };

    const handleUpdateDeck = async (e) => {
        e.preventDefault();
        if (!editingDeck) return;
        try {
            await updateDeck(editingDeck.id, editingTitle, editingDesc);
            handleCloseModal();
            fetchDecks();
        } catch (err) { setError('Erro ao atualizar o baralho.'); }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        navigate('/');
    };

    const renderDecks = () => {
        if (isLoading) {
            return Array.from({ length: 3 }).map((_, index) => <DeckCardSkeleton key={index} />);
        }
        if (decks.length === 0) {
            return (
                <div className="empty-state-container">
                    <h3>Nenhum baralho encontrado.</h3>
                    <p>Clique em "Criar Novo Baralho" para começar!</p>
                </div>
            );
        }
        return decks.map(deck => (
            <Link to={`/decks/${deck.id}`} key={deck.id} className="deck-card-link">
                <div className="deck-card">
                    <div className="card-content">
                        <h2>{deck.titulo}</h2>
                        <p>{deck.descricao || 'Sem descrição'}</p>
                    </div>
                    <div className="card-footer">
                        <small>Autor: {deck.autor}</small>
                        <div className="card-buttons">
                            <button onClick={(e) => handleOpenModal(e, deck)} className="icon-button edit-button" aria-label="Editar Baralho"><FiEdit /></button>
                            <button onClick={(e) => handleDeleteDeck(e, deck.id)} className="icon-button delete-button" aria-label="Excluir Baralho"><FiTrash2 /></button>
                        </div>
                    </div>
                </div>
            </Link>
        ));
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Painel de Baralhos</h1>
                <div className="header-actions">
                    <button onClick={() => setShowCreateForm(!showCreateForm)} className="create-deck-toggle-btn">
                        <FiPlusCircle /> {showCreateForm ? 'Cancelar' : 'Criar Novo Baralho'}
                    </button>
                    <button onClick={handleLogout} className="logout-button">
                        <FiLogOut /> Sair
                    </button>
                </div>
            </header>

            {showCreateForm && (
                <div className="create-deck-form-card">
                    <form onSubmit={handleCreateDeck} className="create-deck-form">
                        <input type="text" placeholder="Título do baralho" value={newDeckTitle} onChange={(e) => setNewDeckTitle(e.target.value)} required />
                        <textarea placeholder="Adicione uma breve descrição..." value={newDeckDesc} onChange={(e) => setNewDeckDesc(e.target.value)} />
                        <button type="submit">Criar Baralho</button>
                    </form>
                </div>
            )}

            {error && <p className="error-message">{error}</p>}
            
            <div className="decks-list">
                {renderDecks()}
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Editar Baralho</h2>
                        <form onSubmit={handleUpdateDeck}>
                            <label htmlFor="editingTitle">Título:</label>
                            <input id="editingTitle" type="text" value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)} required />
                            <label htmlFor="editingDesc">Descrição:</label>
                            <textarea id="editingDesc" value={editingDesc} onChange={(e) => setEditingDesc(e.target.value)} />
                            <div className="modal-actions">
                                <button type="button" onClick={handleCloseModal} className="button-secondary">Cancelar</button>
                                <button type="submit" className="button-primary">Salvar Alterações</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;