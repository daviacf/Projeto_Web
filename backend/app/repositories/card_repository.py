# app/repositories/cartao_repository.py
from app.database import get_db_connection

def get_by_baralho_id(baralho_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Cartoes WHERE baralho_id = %s", (baralho_id,))
    cartoes = cursor.fetchall()
    cursor.close()
    conn.close()
    return cartoes

def create(cartao_id, frente, verso, baralho_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO Cartoes (id, frente, verso, baralho_id) VALUES (%s, %s, %s, %s)",
        (cartao_id, frente, verso, baralho_id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return cartao_id

def delete_by_id(cartao_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Cartoes WHERE id = %s", (cartao_id,))
    conn.commit()
    rows_affected = cursor.rowcount
    cursor.close()
    conn.close()
    return rows_affected > 0