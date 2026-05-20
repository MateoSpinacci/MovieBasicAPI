const service = require('../services/reviewServices');

async function findAll(req, res, next) {
    const reviews = await service.findAll(req.query);
    res.status(200).json({
        estado: 'ok',
        mensaje: reviews
    })
}

async function findFromPk(req, res, next) {
    const reviewByPk = await service.findFromPk(req.params.id);
    res.status(200).json({
        estado: 'ok',
        mensaje: reviewByPk
    })
}

async function updateReview(req, res, next) {
    const reviewActaulizado = await service.updateReview(req.body, req.params.id);
    res.status(200).json({
            estado: 'ok',
            mensaje: reviewActaulizado
        })
}

async function deleteReview(req, res, next) {
    await service.deleteReview(req.params.id);
    res.status(204).send();
}

module.exports = {
    deleteReview,
    findAll,
    updateReview,
    findFromPk,
}