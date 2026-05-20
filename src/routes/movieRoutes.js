const express = require('express');
const routes = express.Router();
const controllerMovie = require('../controllers/movieControllers');
const asyncHandler = require('../utils/asyncHandler');
const verificarId = require('../utils/verificadorId');

routes.get('/', asyncHandler(controllerMovie.findAll));
routes.get('/:id', verificarId, asyncHandler(controllerMovie.findFromPk));
routes.post('/', asyncHandler(controllerMovie.createMovie));
routes.post('/:id/reviews', verificarId, asyncHandler(controllerMovie.createReview));
routes.patch('/:id', verificarId, asyncHandler(controllerMovie.updateMovie));
routes.delete('/:id', verificarId, asyncHandler(controllerMovie.deleteMovie));

module.exports = routes;