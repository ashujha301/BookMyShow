const sequelize = require('../../connection');
const { Sequelize, DataTypes } = require('sequelize');

// Define Movie model
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

// Define Theatre model
const Theatre = sequelize.define('Theatre', {
    TheatreID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TheatreName: {
        type: DataTypes.STRING,
    },
    Location: {
        type: DataTypes.STRING
    }
});

// Define ShowTime model
const ShowTime = sequelize.define("ShowTime", {
    ShowTimeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    MovieID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    TheatreID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Time: {
        type: DataTypes.TIME,
        allowNull: false
    }
});

// Define associations
Movie.hasMany(ShowTime, { foreignKey: 'MovieID' });
Theatre.hasMany(ShowTime, { foreignKey: 'TheatreID' });
ShowTime.belongsTo(Movie, { foreignKey: 'MovieID' });
ShowTime.belongsTo(Theatre, { foreignKey: 'TheatreID' });

// Sync all models with the database
sequelize.sync();

// Export models
module.exports = { Movie, Theatre, ShowTime };
