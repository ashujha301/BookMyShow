const { DataTypes } = require('sequelize');
const sequelize = require("../config/connection");

const ShowTime = sequelize.define("ShowTime",{
    ShowTimeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true        
    },
    MovieID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TheatreID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    AvailableSeats: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = ShowTime;

// Associate models after all models have been defined
const Movie = require('./movieModel');
const Theatre = require('./theatreModel');

ShowTime.belongsTo(Movie, { foreignKey: 'MovieID' });
ShowTime.belongsTo(Theatre, { foreignKey: 'TheatreID' });


ShowTime.sync();

module.exports = ShowTime;