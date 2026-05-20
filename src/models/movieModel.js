const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Movie = sequelize.define(
    'movie',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El Título Es Un Parametro Obligatorio"
                }
            }
        },
        director: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'x'
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El Género Es Un Parametro Obligatorio"
                }
            }
        },
        watched: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        releaseYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El Año De Lanzamiento Es Un Parametro Obligatorio"
                }
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
    tableName: 'Movie'
    }
);

module.exports = Movie;
