from app.database import get_db_connection

def get_all():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT b.id, b.titulo, b.descricao, u.nome as autor FROM Baralhos b JOIN Usuarios u ON b.usuario_id = u.id")
    baralhos = cursor.fetchall()
    cursor.close()
    conn.close()
    return baralhos

def create(baralho_id, titulo, descricao, usuario_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO Baralhos (id, titulo, descricao, usuario_id) VALUES (%s, %s, %s, %s)",
        (baralho_id, titulo, descricao, usuario_id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return baralho_id

def update(baralho_id, titulo=None, descricao=None):
    conn = get_db_connection()
    if not conn:
        return False

    cursor = conn.cursor()
    query_parts = []
    params = []
    
    if titulo is not None:
        query_parts.append("titulo = %s")
        params.append(titulo)
    
    if descricao is not None:
        query_parts.append("descricao = %s")
        params.append(descricao)
    
    if not query_parts:
        return False

    params.append(baralho_id)
    
    query = f"UPDATE Baralhos SET {', '.join(query_parts)} WHERE id = %s"
    
    try:
        cursor.execute(query, tuple(params))
        conn.commit()
        return cursor.rowcount > 0 
    except Exception as e:
        conn.rollback()
        print(f"Erro ao atualizar baralho: {e}")
        return False
    finally:
        cursor.close()
        conn.close()

def find_by_id(baralho_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Baralhos WHERE id = %s", (baralho_id,))
    baralho = cursor.fetchone()
    cursor.close()
    conn.close()
    return baralho

def delete_by_id(baralho_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Baralhos WHERE id = %s", (baralho_id,))
    conn.commit()
    rows_affected = cursor.rowcount
    cursor.close()
    conn.close()
    return rows_affected > 0