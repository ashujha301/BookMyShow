const sequelize = require('../config/connection');
const {DataTypes} = require('sequelize');
const ShowTime = require('./showtimeModel');

const Movie = sequelize.define('Movie', {
    MovieID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    MovieName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Rating: {
        type: DataTypes.STRING,

    },
    Language: {
        type: DataTypes.STRING
    }
});

//Relationship of Movie with Showtime is One to Many 
Movie.hasMany(ShowTime, { foreignKey: 'MovieID' });

Movie.sync();

module.exports = Movie;