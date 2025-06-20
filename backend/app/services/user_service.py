from app.repositories import user_repository
from passlib.hash import pbkdf2_sha256
import jwt
import datetime
import uuid
from flask import current_app

def register_user(nome, email, password):
    if user_repository.find_by_email(email):
        raise ValueError("E-mail já cadastrado.")
    
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