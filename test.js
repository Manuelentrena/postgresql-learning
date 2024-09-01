const comentarios = [
    { id: 1, articulo_id: 1, comentario_padre_id: null, contenido: 'Comentario principal en el primer artículo', fecha_publicacion: '2024-08-01T09:30:00Z', nivel: 0 },
    { id: 2, articulo_id: 1, comentario_padre_id: 1, contenido: 'Respuesta al comentario principal', fecha_publicacion: '2024-08-01T10:00:00Z', nivel: 1 },
    { id: 3, articulo_id: 1, comentario_padre_id: 1, contenido: 'Otra respuesta al comentario principal', fecha_publicacion: '2024-08-01T10:15:00Z', nivel: 1 },
    { id: 4, articulo_id: 1, comentario_padre_id: 3, contenido: 'Respuesta a otra respuesta', fecha_publicacion: '2024-08-01T10:45:00Z', nivel: 2 },
];

function crearEstructuraComentarios(comentarios) {
    const comentarioMap = new Map();
    const resultado = [];

    // Primero, construir un mapa de comentarios por ID
    comentarios.forEach(comentario => {
        comentarioMap.set(comentario.id, { ...comentario, hijos: [] });
    });

    // Luego, construir la estructura jerárquica
    comentarios.forEach(comentario => {
        if (comentario.comentario_padre_id) {
            // Si el comentario tiene un padre, añádelo a la lista de hijos del padre
            const padre = comentarioMap.get(comentario.comentario_padre_id);
            if (padre) {
                padre.hijos.push(comentarioMap.get(comentario.id));
            }
        } else {
            // Si el comentario no tiene padre, es un comentario principal
            resultado.push(comentarioMap.get(comentario.id));
        }
    });

    return resultado;
}

const estructuraComentarios = crearEstructuraComentarios(comentarios);
console.log(JSON.stringify(estructuraComentarios, null, 2));