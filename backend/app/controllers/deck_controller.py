
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
        updated_deck = deck_service.update_baralho(baralho_id, usuario_id, data)
        return jsonify(updated_deck), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except PermissionError as e:
        return jsonify({'error': str(e)}), 403

@baralho_bp.route('/baralhos/<string:deck_id>', methods=['DELETE'])
@token_required
def delete_baralho(deck_id):
    usuario_id = g.user_id
    try:
        deck_service.remove_deck(deck_id, usuario_id)
        return jsonify({'message': 'Baralho deletado com sucesso'}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except PermissionError as e:
        return jsonify({'error': str(e)}), 403