const express = require("express");
const router = express.Router();
const sequelize = require("../../connection");
const { Theatre } = require("../models/tablesModel");

// --------------------------------------------------------//get All Theatres\\------------------------------------------------------------
const all_theatre = async (req, res) => {
  try {
    const theatres = await Theatre.findAll();
    res.status(200).json(theatres);
  } catch (error) {
    console.error("Error fetching Theatre:", error);
    res.status(500).send("Internal server error");
  }
};

// --------------------------------------------------------//Create Theatres\\------------------------------------------------------------
const create_theatre = async (req, res) => {
  try {
    const theatreData = req.body;

    if (!Array.isArray(theatreData) || theatreData.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide a valid array of data" });
    }

    const createdTheatre = await Promise.all(
      theatreData.map(async (theatre) => {
        const { TheatreName, Location } = theatre;

        if (!TheatreName || !Location) {
          return null;
        }

        // Check if theater with the same name exists
        const existingTheatre = await Theatre.findOne({
          where: { TheatreName },
        });

        if (existingTheatre) {
          // Check if the location is the same
          if (existingTheatre.Location === Location) {
            // Theater with the same name and location already exists, skip
            console.log(
              `Theater "${TheatreName}" with the same location already exists. Skipping...`
            );
            return null;
          } else {
            // Theater with the same name but different location exists, create new theater
            console.log(
              `Theater "${TheatreName}" with different location exists. Creating new theater...`
            );
          }
        }

        const newTheatre = await Theatre.create({
          TheatreName,
          Location,
        });

        return { theatreID: newTheatre.theatreID, TheatreName, Location };
      })
    );

    const successfulTheatres = createdTheatre.filter(
      (theatre) => theatre !== null
    );

    res.status(201).json({
      message: "Theatres created successfully",
      theatre: successfulTheatres,
    });
  } catch (error) {
    console.error("Error creating Theatre:", error);
    res.status(500).send("Internal server error");
  }
};

// --------------------------------------------------------//get Particular theatres with id \\------------------------------------------------------------

const theatreId = async (req, res) => {
  try {
    const id = req.params.id;

    const theatreid = await Theatre.findByPk(id);
    if (theatreid) {
      res.json({
        TheatreName: theatreid.TheatreName,
        Location: theatreid.Location,
      });
    } else {
      res.status(404).send(`Theatre with ID ${id} not found`);
    }
  } catch (error) {
    console.error(error);
    res.status(404).send("Theatre not found");
  }
};

module.exports = { all_theatre, theatreId, create_theatre };
