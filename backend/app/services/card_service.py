from app.repositories import card_repository
import uuid

def find_cartoes_by_baralho(baralho_id):
    return card_repository.get_by_baralho_id(baralho_id)

def add_new_card(frente, verso, baralho_id):
    if not frente or not verso:
        raise ValueError("Os campos 'frente' e 'verso' são obrigatórios.")
    
    cartao_id = str(uuid.uuid4())
    card_repository.create(cartao_id, frente, verso, baralho_id)
    return {'id': cartao_id, 'frente': frente, 'verso': verso, 'baralho_id': baralho_id}

def remove_card(cartao_id):
    success = card_repository.delete_by_id(cartao_id)
    if not success:
        raise ValueError("Cartão não encontrado.")
    return True