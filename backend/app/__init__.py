from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    app.config['SECRET_KEY'] = 'uma-chave-secreta-muito-segura-e-diferente'
    CORS(app)

    from .controllers.user_controller import usuario_bp
    from .controllers.deck_controller import baralho_bp
    from .controllers.card_controller import cartao_bp

    app.register_blueprint(usuario_bp, url_prefix='/api')
    app.register_blueprint(baralho_bp, url_prefix='/api')
    app.register_blueprint(cartao_bp, url_prefix='/api')

    return app