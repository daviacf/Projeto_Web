from app.repositories import user_repository
from passlib.hash import pbkdf2_sha256
import jwt
import datetime
import uuid
import re
from flask import current_app

def register_user(nome, email, password):
    if not nome or not nome.strip():
        raise ValueError("O campo nome é obrigatório e não pode estar em branco.")
    
    if len(nome) < 3:
        raise ValueError("Nome deve ter no mínimo 3 digitos.")
    
    if not re.match(r"^[a-zA-ZáàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ\s]+$", nome):
        raise ValueError("O nome deve conter apenas letras e espaços.")
    
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_regex, email):
        raise ValueError("Formato de e-mail inválido.")

    if user_repository.find_by_email(email):
        raise ValueError("E-mail já cadastrado.")
    
    if len(password) < 4:
        raise ValueError("Senha deve ter no mínimo 4 digitos.")
    
    hashed_password = pbkdf2_sha256.hash(password)

    user_id = str(uuid.uuid4()) 
    
    user_repository.create_user(user_id, nome, email, hashed_password)
    return user_id

def authenticate_user(email, password):
    user = user_repository.find_by_email(email)
    
    if user and pbkdf2_sha256.verify(password, user['senha']):
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1),
            'iat': datetime.datetime.utcnow(),
            'sub': user['id']
        }
        token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
        return token
    
    return None