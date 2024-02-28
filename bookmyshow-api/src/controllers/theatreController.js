const express = require("express");
const router = express.Router();
const sequelize = require("../config/connection");
const Theatre = require("../models/theatreModel");
const { trace } = require("../routes/theatreRoutes");

//get all theatres
const all_theatre = async(req,res) =>{
    try {
        const theatres = await Theatre.findAll();
        res.status(200).json(theatres);
    } catch (error) {
        console.error("Error fetching Theatre:",error);
        res.status(500).send("Internal server error");
    }
};

//create theatres

const create_theatre = async(req,res) => {
    try {
        const theatreData = req.body;

        if(!Array.isArray(theatreData) || theatreData.length === 0){
            return res.status(400).json({message:"Please provide a valid array of data"});
        }

        const createdTheatre = await Promise.all(theatreData.map(async (theatre) => {
            const {TheatreName, Location} = theatre;

            if(!TheatreName || !Location ){
                return null;
            }

            const newTheatre = await Theatre.create({
                TheatreName,
                Location
            });

            return {theatreID: newTheatre.theatreID , TheatreName , Location};
        }));

        const sucessfulTheatre = createdTheatre.filter(theatre=>theatre!== null);

        res.status(201).json({ message: "Theatre created successfully", theatre: sucessfulTheatre });

    } catch (error) {
        console.error("Error creating Theatre:",error);
        res.status(500).send("Internal server error");
    }
};

//get particular theatre with id

const theatreId = async(req,res) =>{
    try {
    const id = req.params.id;

    const theatreid = await Theatre.findByPk(id);
    if(theatreid){
        res.json(theatreid);
        }else{
            res.status(404).send(`Theatre with ID ${id} not found`);
        }
    } catch (error) {
        console.error(error);
        res.status(404).send("Theatre not found");
    }
};

module.exports = {all_theatre , theatreId , create_theatre};