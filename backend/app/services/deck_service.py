from app.repositories import deck_repository
import uuid

def find_all_baralhos():
    """Busca todos os baralhos no repositório."""
    return deck_repository.get_all()

def create_baralho(titulo, descricao, usuario_id):
    """Cria um novo baralho para o usuário especificado."""
    if not titulo:
        raise ValueError("O título é obrigatório.")
    
    baralho_id = str(uuid.uuid4())
    deck_repository.create(baralho_id, titulo, descricao, usuario_id)
    return {'id': baralho_id, 'titulo': titulo, 'descricao': descricao, 'usuario_id': usuario_id}

def update_baralho(baralho_id, usuario_id, data):
    """Atualiza um baralho, mas antes verifica se o usuário é o dono."""
    baralho = deck_repository.find_by_id(baralho_id)
    if not baralho:
        raise ValueError("Baralho não encontrado.")
    if baralho['usuario_id'] != usuario_id:
        raise PermissionError("Acesso negado. Você não pode editar um baralho que não é seu.")
    
    titulo = data.get('titulo')
    descricao = data.get('descricao')

    if titulo is None and descricao is None:
        raise ValueError("Nenhum dado fornecido para atualização.")
    
    if titulo is not None and not titulo.strip():
        raise ValueError("O título não pode ser vazio.")

    return deck_repository.update(baralho_id, titulo, descricao)

def remove_deck(baralho_id, usuario_id):
    """Exclui um baralho, mas antes verifica se o usuário é o dono."""
    baralho = deck_repository.find_by_id(baralho_id)
    if not baralho:
        raise ValueError("Baralho não encontrado.")
    if baralho['usuario_id'] != usuario_id:
        raise PermissionError("Acesso negado. Você não pode excluir um baralho que não é seu.")

    success = deck_repository.delete_by_id(baralho_id)
    if not success:
        raise ValueError("Falha ao excluir o baralho.")
    return True