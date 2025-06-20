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

def delete_by_id(baralho_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Baralhos WHERE id = %s", (baralho_id,))
    conn.commit()
    rows_affected = cursor.rowcount
    cursor.close()
    conn.close()
    return rows_affected > 0