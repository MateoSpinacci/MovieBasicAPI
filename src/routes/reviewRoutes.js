const express = require('express');
const routes = express.Router();
const controllerReview = require('../controllers/reviewControllers');
const asyncHandler = require('../utils/asyncHandler');
const verificarId = require('../utils/verificadorId');

routes.get('/', asyncHandler(controllerReview.findAll));
routes.get('/:id', verificarId, asyncHandler(controllerReview.findFromPk));
routes.patch('/:id', verificarId, asyncHandler(controllerReview.updateReview));
routes.delete('/:id', verificarId, asyncHandler(controllerReview.deleteReview));

module.exports = routes;