require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./db');
const { Movie, Review } = require("./models");
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use(express.json());

app.use('/movies', movieRoutes);
app.use('/reviews', reviewRoutes);

app.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada"
    });
});

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        estado: 'error',
        mensaje: error.message
    });
})

async function start() {
    try {
        await sequelize.authenticate();

        await sequelize.sync();

        const cantidad = await Movie.count();

        if (cantidad === 0) {
            await Movie.bulkCreate([
                {
                    title: 'harry potter and the philosophers stone',
                    director: 'chris columbus',
                    genre: 'fantasy',
                    watched: false,
                    releaseYear: 2001,
                    rating: 7,
                },
                {
                    title: 'interstellar',
                    director: 'christopher nolan',
                    genre: 'science fiction',
                    watched: true,
                    releaseYear: 2014,
                    rating: 9,
                },
                {
                    title: 'shrek',
                    director: 'andrew adamson and vicky jenson',
                    genre: 'animation',
                    watched: true,
                    releaseYear: 2001,
                    rating: 8,
                },
                {
                    title: 'transformers: revenge of the fallen',
                    director: 'michael bay',
                    genre: 'action',
                    watched: false,
                    releaseYear: 2009,
                    rating: 5,
                },
                {
                    title: 'la la land',
                    director: 'damien chazelle',
                    genre: 'musical',
                    watched: true,
                    releaseYear: 2016,
                    rating: 7,
                },
                {
                    title: 'the conjuring',
                    director: 'james wan',
                    genre: 'horror',
                    watched: false,
                    releaseYear: 2013,
                    rating: 4,
                },
                {
                    title: 'free guy',
                    director: 'shawn levy',
                    genre: 'comedy',
                    watched: true,
                    releaseYear: 2021,
                    rating: 7,
                },
            ])

            await Review.bulkCreate([
                {
                    movieId: 2,
                    comentario: 'La mejor película que vi en mi vida', 
                    autor: 'Mateo',
                    score: 10
                },
                {
                    movieId: 2,
                    comentario: 'Una obra de arte', 
                    autor: 'Juan',
                    score: 9
                },
                {
                    movieId: 1,
                    comentario: 'No me gustó para nada, no recomiendo esta película', 
                    autor: 'Lionel',
                    score: 2
                },
                {
                    movieId: 1,
                    comentario: 'Muy divertida',
                    autor: 'Mateo',
                    score: 8
                },
                {
                    movieId: 2,
                    comentario: 'Increíble final',
                    autor: 'Juan',
                    score: 9
                },
                {
                    movieId: 2,
                    comentario: 'Muy larga',
                    autor: 'Lucía',
                    score: 7
                },
                {
                    movieId: 4,
                    comentario: 'No me gustó',
                    autor: 'Tomás',
                    score: 4
                },
                {
                    movieId: 5,
                    comentario: 'Da bastante miedo',
                    autor: 'Carla',
                    score: 7
                },
                {
                    movieId: 7,
                    comentario: 'Muy graciosa',
                    autor: 'Sofía',
                    score: 8
                }
            ])

        };

        app.listen(process.env.PORT, () => {
            console.log(`API escuchando en http://localhost:${process.env.PORT}`);
        });

    } catch (error) {
        console.error('No se pudo iniciar la API:', error.message);
        process.exit(1);
    }
}

start();