const express = require('express');
const app = express();
const sequelize = require('./db');
const { Movie, Review } = require("./models");
const config = require('./config/movieConfig');
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
                }
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
                }
            ])

        };

        app.listen(config.port, () => {
            console.log(`API escuchando en http://localhost:${config.port}`);
        });

    } catch (error) {
        console.error('No se pudo iniciar la API:', error.message);
        process.exit(1);
    }
}

start();