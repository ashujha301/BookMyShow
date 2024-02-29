const express = require("express");
const { Movie,Theatre,ShowTime } = require("../models/tablesModel");


// --------------------------------------------------------//get All Movies\\------------------------------------------------------------
const all_movie = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send("Internal server error");
  }
};

// --------------------------------------------------------//Create Movies\\------------------------------------------------------------
const create_movie = async (req, res) => {
  try {
    const movieData = req.body;

    if (!Array.isArray(movieData) || movieData.length === 0) {
      res.status(400).json({ message: "Expected an array of objects." });
      return;
    }

    const successfulMovies = [];
    const skippedMovies = [];

    for (const movie of movieData) {
      const { MovieName, Rating, Language } = movie;

      if (!MovieName || !Rating || !Language) {
        continue;
      }

      // Check if movie with the same name already exists
      const existingMovie = await Movie.findOne({ where: { MovieName } });

      if (existingMovie) {
        skippedMovies.push({
          MovieName,
          message: "Movie with the same name already exists",
        });
        continue;
      }

      const newMovie = await Movie.create({
        MovieName,
        Rating,
        Language,
      });

      successfulMovies.push({
        movieId: newMovie.movieId,
        MovieName,
        Rating,
        Language,
      });
    }

    res.status(201).json({
      message: "Movies created successfully",
      successfulMovies,
      skippedMovies,
    });
  } catch (error) {
    console.error("Error creating new movie:", error);
    res.status(500).send("Server Error");
  }
};

//--------------------------------------------------------//List all Theatres with MovieID and dates\\--------------------------------------------------------
const listTheatres = async (req, res) => {
  try {
    const { id } = req.params;
    const { Date } = req.query;

    if (!id || !Date) {
      return res
        .status(400)
        .json({ message: "Please provide a valid movie ID and date." });
    }

    const showtimes = await ShowTime.findAll({
      where: {
        MovieID: id,
        Date: Date,
      },
      include: [
        {
          model: Theatre,
          attributes: ["TheatreName", "Location"],
        },
        {
          model:Movie,
          attributes: ["MovieName"]
        }
      ],
    });

    const response = showtimes.map(showtime => ({
      Theatre: showtime.Theatre,
      Movie: showtime.Movie
    }));

    res.json(response);
  } catch (error) {
    console.error("Error fetching showtimes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { all_movie, create_movie, listTheatres };
