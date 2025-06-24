from app.database import get_db_connection

def get_by_baralho_id(baralho_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM cartoes WHERE baralho_id = %s", (baralho_id,))
    cartoes = cursor.fetchall()
    cursor.close()
    conn.close()
    return cartoes

def create(cartao_id, frente, verso, baralho_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO cartoes (id, frente, verso, baralho_id) VALUES (%s, %s, %s, %s)",
        (cartao_id, frente, verso, baralho_id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return cartao_id

def update(cartao_id, frente=None, verso=None):
    conn = get_db_connection()
    if not conn:
        return False
    
    try:
        cursor = conn.cursor()
        
        query_parts = []
        params = []
        
        if frente is not None:
            query_parts.append("frente = %s")
            params.append(frente)
            
        if verso is not None:
            query_parts.append("verso = %s")
            params.append(verso)
            
        if not query_parts:
            return False
            
        params.append(cartao_id)
        
        query = f"UPDATE cartoes SET {', '.join(query_parts)} WHERE id = %s"
        
        cursor.execute(query, tuple(params))
        conn.commit()
        
        return cursor.rowcount > 0
    except Exception as e:
        conn.rollback()
        print(f"Erro no repositório ao atualizar cartão: {e}")
        return False
    finally:
        cursor.close()
        conn.close()

def find_by_id(cartao_id):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM cartoes WHERE id = %s", (cartao_id,))
        cartao = cursor.fetchone()
        cursor.close()
        conn.close()
        return cartao
    return None

def delete_by_id(cartao_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM cartoes WHERE id = %s", (cartao_id,))
    conn.commit()
    rows_affected = cursor.rowcount
    cursor.close()
    conn.close()
    return rows_affected > 0