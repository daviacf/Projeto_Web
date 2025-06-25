from app.repositories import card_repository, deck_repository
import uuid

def find_cartoes_by_baralho(baralho_id):
    """Busca todos os cartões de um baralho específico."""
    return card_repository.get_by_baralho_id(baralho_id)

def add_new_card(frente, verso, baralho_id, usuario_id):
    """Adiciona um novo cartão, mas antes verifica se o usuário é o dono do baralho."""
    baralho = deck_repository.find_by_id(baralho_id)
    if not baralho or baralho['usuario_id'] != usuario_id:
        raise PermissionError("Acesso negado. Você não pode adicionar cartões a um baralho que não é seu.")

    if not frente or not verso:
        raise ValueError("Os campos 'frente' e 'verso' são obrigatórios.")
    
    cartao_id = str(uuid.uuid4())
    card_repository.create(cartao_id, frente, verso, baralho_id)
    return {'id': cartao_id, 'frente': frente, 'verso': verso, 'baralho_id': baralho_id}

def update_card(cartao_id, data, usuario_id):
    """Atualiza um cartão, mas antes verifica se o usuário é o dono do baralho ao qual o cartão pertence."""
    cartao = card_repository.find_by_id(cartao_id)
    if not cartao:
        raise ValueError("Cartão não encontrado.")
    
    baralho = deck_repository.find_by_id(cartao['baralho_id'])
    if not baralho or baralho['usuario_id'] != usuario_id:
        raise PermissionError("Acesso negado. Você não pode editar um cartão que não é seu.")

    frente = data.get('frente')
    verso = data.get('verso')

    if frente is None and verso is None:
        raise ValueError("Nenhum dado fornecido para atualização.")

    if (frente is not None and not frente.strip()) or (verso is not None and not verso.strip()):
        raise ValueError("Os campos não podem ser vazios.")
        
    success = card_repository.update(cartao_id, frente, verso)
    if not success:
        raise ValueError("Falha na atualização.")
    return card_repository.find_by_id(cartao_id)

def remove_card(cartao_id, usuario_id):
    """Exclui um cartão, mas antes verifica se o usuário é o dono."""
    cartao = card_repository.find_by_id(cartao_id)
    if not cartao:
        raise ValueError("Cartão não encontrado.")
        
    baralho = deck_repository.find_by_id(cartao['baralho_id'])
    if not baralho or baralho['usuario_id'] != usuario_id:
        raise PermissionError("Acesso negado. Você não pode excluir um cartão que não é seu.")

    success = card_repository.delete_by_id(cartao_id)
    if not success:
        raise ValueError("Falha ao excluir o cartão.")
    return True