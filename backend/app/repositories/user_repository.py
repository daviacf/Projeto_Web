from app.database import get_db_connection

def find_by_email(email):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuarios WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()
        return user
    return None

def create_user(user_id, nome, email, hashed_password):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO usuarios (id, nome, email, senha) VALUES (%s, %s, %s, %s)",
            (user_id, nome, email, hashed_password)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return user_id
    return None