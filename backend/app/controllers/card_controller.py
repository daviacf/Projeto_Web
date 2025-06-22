from flask import Blueprint, request, jsonify, g
from app.services import card_service
from app.utils.decorators import token_required

cartao_bp = Blueprint('cartao_bp', __name__)

@cartao_bp.route('/baralhos/<string:baralho_id>/cartoes', methods=['GET'])
def get_cartoes_do_baralho(baralho_id):
    cartoes = card_service.find_cartoes_by_baralho(baralho_id)
    return jsonify(cartoes)

@cartao_bp.route('/baralhos/<string:baralho_id>/cartoes', methods=['POST'])
@token_required
def create_cartao(baralho_id):
    data = request.get_json()
    try:
        novo_cartao = card_service.add_new_card(data['frente'], data['verso'], baralho_id)
        return jsonify(novo_cartao), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    
@cartao_bp.route('/cartoes/<string:cartao_id>', methods=['PUT'])
@token_required
def update_cartao(cartao_id):
    data = request.get_json()
    try:
        updated_cartao = card_service.update_card(cartao_id, data)
        return jsonify(updated_cartao)
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Erro interno do servidor'}), 500

@cartao_bp.route('/cartoes/<string:cartao_id>', methods=['DELETE'])
@token_required
def delete_cartao(cartao_id):
    try:
        card_service.remove_card(cartao_id)
        return jsonify({'message': 'Cartão deletado com sucesso'}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404