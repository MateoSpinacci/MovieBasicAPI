const repo = require('../repositories/reviewRepository');
const appError = require('../utils/appError');

async function identificarFiltros(query) {
    const filtros = {};

    if (query.search) {
        filtros.search = query.search.toLowerCase().trim();
    }

    if (query.autor) {
        filtros.autor = query.autor.toLowerCase().trim();
    }

    if (query.movieId) {
        filtros.movieId = query.movieId;
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
                query.limit = 5;
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
    const reviews = await repo.findAll(filtros);
    if (reviews.length === 0) {
        throw new appError('No Se Encontraron Reseñas Que Coincidan', 404)
    }
    return reviews;
}

async function findFromPk(idString) {
    const review = await repo.findFromPk(idString);
    if (review === null) {
        throw new appError('No Se Encontró Reseña Que Coincida', 404)
    }
    return review;
}

async function updateReview(body, idString) {
    if (body.score < 0 || body.score > 10) {
        throw new appError('El Puntaje Solo Puede Estar Entre 0-10', 400)
    }
    const reviewToBeUpdated = await repo.updateReview(body, idString)
    if (!reviewToBeUpdated) {
        throw new appError('Reseña No Encontrada', 404)
    }
    return reviewToBeUpdated;
}

async function deleteReview(idString) {
    const exits = await repo.deleteReview(idString);
    if (!exits) {
        throw new appError('Reseña No Encontrada', 404)
    }
    return true;
}

module.exports = {
    deleteReview,
    findFromPk,
    updateReview,
    findAll,
}