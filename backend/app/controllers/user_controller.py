from flask import Blueprint, request, jsonify
from app.services import user_service

usuario_bp = Blueprint('usuario_bp', __name__)

@usuario_bp.route('/usuarios', methods=['POST'])
def register():
    data = request.get_json()
    try:
        user_id = user_service.register_user(data['nome'], data['email'], data['senha'])
        return jsonify({'message': 'Usuário criado com sucesso!', 'user_id': user_id}), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Erro interno do servidor'}), 500

@usuario_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    token = user_service.authenticate_user(data['email'], data['senha'])
    
    if token:
        return jsonify({'token': token})
    
    return jsonify({'message': 'Credenciais inválidas'}), 401