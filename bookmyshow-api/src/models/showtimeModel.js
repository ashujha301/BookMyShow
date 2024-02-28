const {DataTypes} =  require('sequelize');
const sequelize = require("../config/connection");
const Movie = require('./movieModel');
const Theatre = require('./theatreModel');

const ShowTime = sequelize.define("ShowTime",{
    ShowTimeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true        
    },
    MovieID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Movie,
            key: MovieID
        }
    },
    TheatreID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Theatre,
            key: TheatreID
        }
    },
    Date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Time: {
        type: DataTypes.TIME,
        allowNull: FontFaceSetLoadEvent
    },
    AvailableSeats: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

//Relationship of showtime with movie and theatre table

ShowTime.belongsTo(Movie);
ShowTime.belongsTo(Theatre);

ShowTime.sync();

module.exports = ShowTime;