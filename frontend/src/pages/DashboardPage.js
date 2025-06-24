// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllDecks, createDeck, deleteDeck, updateDeck } from '../api/deckService'; // 1. Importe updateDeck
import './DashboardPage.css';

const DashboardPage = () => {
    const [decks, setDecks] = useState([]);
    const [error, setError] = useState('');
    const [newDeckTitle, setNewDeckTitle] = useState('');
    const [newDeckDesc, setNewDeckDesc] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDeck, setEditingDeck] = useState(null);

    // 2. Crie estados para os inputs do modal
    const [editingTitle, setEditingTitle] = useState('');
    const [editingDesc, setEditingDesc] = useState('');

    const fetchDecks = async () => {
        try {
            const response = await getAllDecks();
            setDecks(response.data);
        } catch (err) {
            setError('Não foi possível carregar os baralhos.');
            console.error(err);
        }
    };

    useEffect(() => { fetchDecks(); }, []);

    const handleCreateDeck = async (e) => { /* ... (sem alterações) ... */
        e.preventDefault();
        try {
            await createDeck(newDeckTitle, newDeckDesc);
            setNewDeckTitle(''); setNewDeckDesc('');
            fetchDecks();
        } catch (err) {
            setError('Erro ao criar o baralho.'); console.error(err);
        }
    };

    const handleDeleteDeck = async (e, deckId) => { /* ... (sem alterações) ... */
        e.preventDefault(); e.stopPropagation();
        if (window.confirm('Tem certeza que deseja excluir este baralho e todos os seus cartões?')) {
            try {
                await deleteDeck(deckId);
                fetchDecks();
            } catch (err) {
                setError('Erro ao excluir o baralho.'); console.error(err);
            }
        }
    };
    
    // 3. Atualize a função de abrir o modal
    const handleOpenModal = (e, deck) => {
        e.preventDefault(); e.stopPropagation();
        setEditingDeck(deck);
        setEditingTitle(deck.titulo); // Preenche o estado do título
        setEditingDesc(deck.descricao); // Preenche o estado da descrição
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); setEditingDeck(null);
    };

    // 4. Substitua a função de update pela lógica final
    const handleUpdateDeck = async (e) => {
        e.preventDefault();
        if (!editingDeck) return;
        try {
            await updateDeck(editingDeck.id, editingTitle, editingDesc);
            handleCloseModal();
            fetchDecks(); // Atualiza a lista para refletir a mudança
        } catch (err) {
            setError('Erro ao atualizar o baralho.');
            console.error(err);
        }
    };

    return (
        <div className="dashboard-container">
            {/* ... (header e formulário de criação sem alterações) ... */}
            <header className="dashboard-header"><h1>Painel de Baralhos</h1><button>Sair</button></header>
            <div className="create-deck-form"><h3>Criar Novo Baralho</h3><form onSubmit={handleCreateDeck}><input type="text" placeholder="Título do baralho" value={newDeckTitle} onChange={(e) => setNewDeckTitle(e.target.value)} required /><textarea placeholder="Descrição do baralho" value={newDeckDesc} onChange={(e) => setNewDeckDesc(e.target.value)} /><button type="submit">Criar Baralho</button></form></div>

            {error && <p className="error-message">{error}</p>}

            <div className="decks-list">
                {decks.map(deck => (
                    <Link to={`/decks/${deck.id}`} key={deck.id} className="deck-card-link">
                        <div className="deck-card">
                            <div className="card-buttons">
                                <button onClick={(e) => handleOpenModal(e, deck)} className="edit-button">✏️</button>
                                <button onClick={(e) => handleDeleteDeck(e, deck.id)} className="delete-button">X</button>
                            </div>
                            <h2>{deck.titulo}</h2><p>{deck.descricao}</p><small>Autor: {deck.autor}</small>
                        </div>
                    </Link>
                ))}
            </div>

            {/* 5. Conecte os inputs do modal aos novos estados */}
            {isModalOpen && editingDeck && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Editar Baralho</h2>
                        <form onSubmit={handleUpdateDeck}>
                            <label>Título:</label>
                            <input
                                type="text"
                                value={editingTitle}
                                onChange={(e) => setEditingTitle(e.target.value)}
                                required
                            />
                            <label>Descrição:</label>
                            <textarea
                                value={editingDesc}
                                onChange={(e) => setEditingDesc(e.target.value)}
                            />
                            <div className="modal-actions">
                                <button type="submit" className="button-primary">Salvar</button>
                                <button type="button" onClick={handleCloseModal} className="button-secondary">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;