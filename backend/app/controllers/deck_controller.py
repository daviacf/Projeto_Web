from flask import Blueprint, request, jsonify, g
from app.services import deck_service
from app.utils.decorators import token_required

baralho_bp = Blueprint('baralho_bp', __name__)

@baralho_bp.route('/baralhos', methods=['GET'])
def get_baralhos():
    baralhos = deck_service.find_all_baralhos()
    return jsonify(baralhos)

@baralho_bp.route('/baralhos', methods=['POST'])
@token_required
def create_baralho():
    data = request.get_json()
    usuario_id = g.user_id 
    try:
        novo_baralho = deck_service.create_baralho(data['titulo'], data.get('descricao', ''), usuario_id)
        return jsonify(novo_baralho), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    
@baralho_bp.route('/baralhos/<string:baralho_id>', methods=['PUT'])
@token_required
def update_baralho(baralho_id):
    usuario_id = g.user_id
    data = request.get_json()

    try:
        success = deck_service.update_baralho(baralho_id, usuario_id, data)
        if success:
            return jsonify({'message': 'Baralho atualizado com sucesso.'}), 200
        else:
            return jsonify({'message': 'Nenhuma alteração realizada.'}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except PermissionError as e:
        return jsonify({'error': str(e)}), 403
    except Exception as e:
        return jsonify({'error': 'Erro interno do servidor'}), 500
    
# app/controllers/deck_controller.py

@baralho_bp.route('/baralhos/<string:deck_id>', methods=['DELETE'])
@token_required
def delete_baralho(deck_id): # <-- Nome da função corrigido para clareza
    usuario_id = g.user_id # Pega o ID do usuário logado a partir do token
    try:
        deck_service.remove_deck(deck_id, usuario_id) # Passa o ID do usuário para a verificação
        return jsonify({'message': 'Baralho deletado com sucesso'}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except PermissionError as e: # Adicionamos um tratamento para o novo erro de permissão
        return jsonify({'error': str(e)}), 403 # 403 Forbidden é o status correto para acesso negado