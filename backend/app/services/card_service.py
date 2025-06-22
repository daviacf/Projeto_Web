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

def update_card(cartao_id, data):
    frente = data.get('frente')
    verso = data.get('verso')

    if frente is None and verso is None:
        raise ValueError("Nenhum dado fornecido para atualização.")
    
    if len(frente) == 0:
        raise ValueError("Titulo não pode ser vazio.")
    
    if len(verso) == 0:
        raise ValueError("Descricao não pode ser vazio.")

    success = card_repository.update(cartao_id, frente, verso)
    
    if not success:
        raise ValueError("Cartão não encontrado ou falha na atualização.")
    
    updated_card = card_repository.find_by_id(cartao_id)
    return updated_card

def remove_card(cartao_id):
    success = card_repository.delete_by_id(cartao_id)
    if not success:
        raise ValueError("Cartão não encontrado.")
    return True