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

def update_baralho(baralho_id, usuario_id, data):
    baralho = deck_repository.find_by_id(baralho_id)

    if not baralho:
        raise ValueError("Baralho não encontrado.")
    
    if baralho['usuario_id'] != usuario_id:
        raise PermissionError("Acesso negado.")

    titulo = data.get('titulo')
    descricao = data.get('descricao')

    if titulo is None and descricao is None:
        raise ValueError("Nenhum dado fornecido para atualização.")
    
    if len(titulo) == 0:
        raise ValueError("Titulo não pode ser vazio.")
    
    if len(descricao) == 0:
        raise ValueError("Descricao não pode ser vazio.")

    return deck_repository.update(baralho_id, titulo, descricao)

def remove_deck(cartao_id):
    success = deck_repository.delete_by_id(cartao_id)
    if not success:
        raise ValueError("Baralho não encontrado.")
    return True