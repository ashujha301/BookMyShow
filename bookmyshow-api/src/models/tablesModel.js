const sequelize = require('../../connection');
const { Sequelize, DataTypes } = require('sequelize');

// --------------------------------------------------------// Define Movie model\\------------------------------------------------------------
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
},
{
    indexes: [
        {
            unique:true,
            fields: ['MovieID']
        }
    ]
});

// --------------------------------------------------------// Define Movie model\\------------------------------------------------------------
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
},{
    indexes: [{
        unique:true,
        fields: ['TheatreID']
    }]
});

// --------------------------------------------------------// Define Movie model\\------------------------------------------------------------
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


// --------------------------------------------------------//Drop Indexes\\------------------------------------------------------------

// sequelize.queryInterface.removeIndex('Movies', 'MovieID')
//   .then(() => {
//     console.log('Index on MovieID removed successfully.');
//   })
//   .catch((error) => {
//     console.error('Error removing index on MovieID:', error);
//   });

// // Remove the index on TheatreID in the Theatre table
// sequelize.queryInterface.removeIndex('Theatres', 'TheatreID')
//   .then(() => {
//     console.log('Index on TheatreID removed successfully.');
//   })
//   .catch((error) => {
//     console.error('Error removing index on TheatreID:', error);
//   });

// sequelize.queryInterface.removeIndex('ShowTime', 'Date')
// .then(()=>{
//     console.log("index removed");
// })
// .catch(err =>{
//     console.error(err);
// });

module.exports = { Movie, Theatre, ShowTime };

