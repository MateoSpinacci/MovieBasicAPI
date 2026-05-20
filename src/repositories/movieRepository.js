const { Op } = require('sequelize');
const { Movie, Review } = require('../models');

async function findAll(filtros) {
    const where = {};
    const total = {};
    if (filtros.watched !== undefined) {
        where.watched = filtros.watched;
    }
    if (filtros.genre) {
        where.genre = filtros.genre;
    }
    if (filtros.search) {
        where.title = {
            [Op.like]: `%${filtros.search}%`
        }
    }
    if (filtros.minRating) {
        where.rating = {
            [Op.gte]: filtros.minRating 
        }
    }
    total.where = where;
    if (filtros.order) {
        total.order = [filtros.order];
    }
    total.include = Review;
    return await Movie.findAll(total)
}

async function findFromPk(id) {
    return await Movie.findByPk(id, {
        include: Review
    });
}

async function createMovie(body) {
    const movieCreado = await Movie.create({
        title: body.title.toLowerCase().trim(),
        director: (body.director) ? body.director.toLowerCase().trim() : undefined,
        genre: body.genre.toLowerCase().trim(),
        watched: body.watched,
        releaseYear: body.releaseYear,
        rating: body.rating,
    })

    return movieCreado;
}

async function createReview(body, id) {
    const movieReview = await Movie.findByPk(id);
    if (movieReview === null) {
        return null;
    }
    const reviewCreada = await Review.create({
            movieId: id,
            comentario: body.comentario, 
            autor: body.autor,
            score: body.score,
    })
    return reviewCreada
}

async function updateMovie(body, id) {
    const movieToBeUpdated = await Movie.findByPk(id);
    if (movieToBeUpdated === null) {
        return null;
    }

    const newMovie = {
        title: (body.title) ? body.title.toLowerCase().trim() : movieToBeUpdated.title,
        director: (body.director) ? body.director.toLowerCase().trim() : movieToBeUpdated.director,
        genre: (body.genre) ? body.genre.toLowerCase().trim() : movieToBeUpdated.genre,
        watched: body.watched ?? movieToBeUpdated.watched,
        releaseYear: body.releaseYear ?? movieToBeUpdated.releaseYear,
        rating: body.rating ?? movieToBeUpdated.rating,
    };

    await Movie.update(newMovie, {
        where: {id}
    })

    return newMovie;
}

async function deleteMovie(id) {
    const movieToBeDeleted = await Movie.findByPk(id);
    if (!movieToBeDeleted) {
        return false
    }
    await Movie.destroy({where: {id}})
    return true;
}

module.exports = {
    findAll,
    createMovie,
    findFromPk,
    updateMovie,
    createReview,
    deleteMovie,
}