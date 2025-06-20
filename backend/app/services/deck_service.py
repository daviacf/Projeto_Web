# app/services/baralho_service.py
from app.repositories import deck_repository
import uuid

def find_all_baralhos():
    return deck_repository.get_all()

def create_baralho(titulo, descricao, usuario_id):
    if not titulo:
        raise ValueError("O título é obrigatório.")
    
    baralho_id = str(uuid.uuid4())
    deck_repository.create(baralho_id, titulo, descricao, usuario_id)
    return {'id': baralho_id, 'titulo': titulo, 'descricao': descricao, 'usuario_id': usuario_id}

def remove_deck(cartao_id):
    success = deck_repository.delete_by_id(cartao_id)
    if not success:
        raise ValueError("Baralho não encontrado.")
    return True