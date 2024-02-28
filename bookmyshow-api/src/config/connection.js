const {Sequelize} = require('sequelize');
require("dotenv").config();
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const db = process.env.DB_NAME;

const sequelize = new Sequelize(db , user , password , {
    host: host,
    dialect: 'mysql'
});

//test the database connection
sequelize.authenticate()
.then(() => {
    console.log( "Connection has been established successfully." );
})
.catch(err => {
    console.error('Error connecting to database:', err);
});


module.exports = sequelize;