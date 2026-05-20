const Movie = require("./movieModel")
const Review = require("./reviewModel")

Movie.hasMany(Review, {
    foreignKey: 'movieId',
});
Review.belongsTo(Movie, {
    foreignKey: 'movieId',
});

module.exports = {
    Movie,
    Review,
}