const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Review = sequelize.define(
    'review',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        comentario: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El Título Es Un Parametro Obligatorio"
                }
            }
        },
        autor: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Anónimo'
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El Puntaje Es Un Parametro Obligatorio"
                }
            }
        }
    },
    {
    tableName: 'Review'
    }
);

module.exports = Review;