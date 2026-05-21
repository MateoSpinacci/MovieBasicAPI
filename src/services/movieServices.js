const repo = require('../repositories/movieRepository');
const appError = require('../utils/appError');

async function createReview(body, idString) {
    if (body.comentario === undefined) {
        throw new appError('No Se Puede Añadir Una Reseña Sin Comentario', 400)
    }
    if (body.score === undefined) {
        throw new appError('No Se Puede Añadir Una Reseña Sin Puntaje', 400)
    }
    if (body.score < 0 || body.score > 10) {
        throw new appError('El Puntaje Solo Puede Estar Entre 0-10', 400)
    }
    const review = await repo.createReview(body, idString);
    console.log('Service final');
    if (review === null) {
        throw new appError('No Se Encontró Pelicula Que Coincida', 404)
    }

    return review;
}

async function identificarFiltros(query) {
    const filtros = {};

    if (query.watched !== undefined) {
        if (query.watched === 'true' || query.watched === 'false') {
            filtros.watched = query.watched === 'true';
        } else {
            throw new appError('Solo True o False', 400);
        }
    }

    if (query.genre) {
        filtros.genre = query.genre.toLowerCase().trim();
    }

    if (query.search) {
        filtros.search = query.search.toLowerCase().trim();
    }

    if (query.minRating) {
        filtros.minRating = query.minRating;
    }
    if (query.page) {
        const pags = Number.parseInt(query.page);
        if (Number.isInteger(pags) && pags > 0) {
            if (query.limit) {
                const limit = Number.parseInt(query.limit);
                if (!Number.isInteger(limit) || limit < 0) {
                    throw new appError('Cantidad de Páginas Invalida', 400)
                }
            } else {
                query.limit = 1;
            }
            filtros.limit = query.limit;
            filtros.offset = (pags - 1) * query.limit;
        } else {
            throw new appError('Página Invalida', 400);
        }
    }
    if (query.order) {
        if (query.direction === undefined) {
            query.direction = 'ASC';
        }
        if (query.direction.toUpperCase().trim() === 'ASC' || query.direction.toUpperCase().trim() === 'DESC') {
            filtros.order = [query.order.toUpperCase().trim(), query.direction.toUpperCase().trim()];
        } else {
            throw new appError('Solo Se Puede Ordenar Por Orden Ascendente o Descendente...', 400)
        }
    }
    return filtros;
}

async function findAll(query) {
    const filtros = await identificarFiltros(query); 
    const movies = await repo.findAll(filtros);
    if (movies.length === 0) {
        throw new appError('No Se Encontraron Peliculas Que Coincidan', 404)
    }
    return movies;
}

async function findFromPk(idString) {
    const movie = await repo.findFromPk(idString);
    if (movie === null) {
        throw new appError('No Se Encontró Pelicula Que Coincida', 404)
    }
    return movie;
}

async function createMovie(body) {
    if (body.title === undefined) {
        throw new appError('No Se Puede Añadir Una Pelicula Sin Título', 400)
    }
    if (body.genre === undefined) {
        throw new appError('No Se Puede Añadir Una Pelicula Sin Género', 400)
    }
    if (body.releaseYear === undefined) {
        throw new appError('No Se Puede Añadir Una Pelicula Sin Año De Lanzamiento', 400)
    } 
    if (body.rating !== undefined) {
        if (body.rating < 0 || body.rating > 10) {
            throw new appError('El Puntaje Solo Puede Estar Entre 0-10', 400)
        }
    }
    
    return await repo.createMovie(body);
}

async function updateMovie(body, idString) {
    if (body.rating !== undefined) {
        if (body.rating < 0 || body.rating > 10) {
            throw new appError('El Puntaje Solo Puede Estar Entre 0-10', 400)
        }
    }
    const movieToBeUpdated = await repo.updateMovie(body, idString)
    if (!movieToBeUpdated) {
        throw new appError('Pelicula No Encontrada', 404)
    }
    return movieToBeUpdated;
}

async function deleteMovie(idString) {
    const exits = await repo.deleteMovie(idString);
    if (!exits) {
        throw new appError('Pelicula No Encontrada', 404)
    }
    return true;
}

module.exports = {
    findAll,
    updateMovie,
    createMovie,
    deleteMovie,
    findFromPk,
    createReview,
}