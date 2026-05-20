const service = require('../services/movieServices');

async function findAll(req, res, next) {
    const movies = await service.findAll(req.query);
    res.status(200).json({
        estado: 'ok',
        mensaje: movies
    })
}

async function findFromPk(req, res, next) {
    const movieByPk = await service.findFromPk(req.params.id);
    res.status(200).json({
        estado: 'ok',
        mensaje: movieByPk
    })
}

async function createMovie(req, res, next) {
    const movieCreado = await service.createMovie(req.body);
    res.status(201).json({
        estado: 'ok',
        mensaje: movieCreado
    })
}

async function createReview(req, res, next) {
    const reviewCreada = await service.createReview(req.body, req.params.id);
    res.status(201).json({
        estado: 'ok',
        mensaje: reviewCreada
    })
}

async function updateMovie(req, res, next) {
    const movieActaulizado = await service.updateMovie(req.body, req.params.id);
    res.status(200).json({
        estado: 'ok',
        mensaje: movieActaulizado
    })
}

async function deleteMovie(req, res, next) {
    await service.deleteMovie(req.params.id);
    res.status(204).send();
}

module.exports = {
    findAll,
    createMovie,
    deleteMovie,
    findFromPk,
    updateMovie,
    createReview,
}