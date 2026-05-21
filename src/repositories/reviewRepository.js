const { Op } = require('sequelize');
const { Movie, Review } = require('../models');

async function findAll(filtros) {
    const where = {};
    const total = {};

    if (filtros.autor) {
        where.autor = filtros.autor;
    }
    if (filtros.movieId) {
        where.movieId = {
            [Op.eq]: filtros.movieId 
        }
    }
    if (filtros.search) {
        where.comentario = {
            [Op.like]: `%${filtros.search}%`
        }
    }
    if (filtros.minRating) {
        where.score = {
            [Op.gte]: filtros.minRating 
        }
    }
    total.where = where;
    if (filtros.limit) {
        total.limit = filtros.limit;
        total.offset = filtros.offset;
    }
    if (filtros.order) {
        total.order = [filtros.order];
    }
    total.include = Movie;
    return await Review.findAll(total);
}

async function findFromPk(id) {
    return await Review.findByPk(id, {
        include: Movie
    });
}

async function updateReview(body, id) {
    const reviewToBeUpdated = await Review.findByPk(id);
    if (reviewToBeUpdated === null) {
        return null;
    }

    const newReview = {
        comentario: (body.comentario) ? body.comentario.toLowerCase().trim() : reviewToBeUpdated.comentario,
        autor: (body.autor) ? body.autor.toLowerCase().trim() : reviewToBeUpdated.autor,
        score: body.score ?? reviewToBeUpdated.score,
    };

    await Review.update(newReview, {
        where: {id}
    })

    return newReview;
}

async function deleteReview(id) {
    const movieToBeDeleted = await Review.findByPk(id);
    if (!movieToBeDeleted) {
        return false
    }
    await Review.destroy({where: {id}})
    return true;
}

module.exports = {
    deleteReview,
    updateReview,
    findFromPk,
    findAll,
}