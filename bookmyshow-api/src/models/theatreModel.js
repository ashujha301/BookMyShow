const {DataTypes} = require('sequelize');
const sequelize = require("../config/connection");
const ShowTime = require('./showtimeModel');

const Theatre = sequelize.define('Theatre', {
    TheatreID: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    TheatreName: {
        type: DataTypes.STRING,
    },
    Location: {
        type: DataTypes.STRING
    }
});

//Relationship of theatre with showtime is One to many
Theatre.hasMany(ShowTime,{foreignKey: 'TheatreID'});

Theatre.sync();

module.exports = Theatre;