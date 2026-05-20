const appError = require('./appError');

function verificarID(req, res, next) {
    const id = Number.parseInt(req.params.id);
    if (!Number.isInteger(id) || id < 0) {
        throw new appError('Solo Se Pueden Usar IDs Enteros Positivos', 400)
    }

    next()
}

module.exports = verificarID;