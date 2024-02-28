const {DataTypes} =  require('sequelize');
const sequelize = require("../config/connection");

const Tickets = sequelize.define("Tickets",{

});

Tickets.sync();

module.exports = Tickets;