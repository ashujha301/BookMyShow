const express = require("express");
const {Movie} = require('../models/tablesModel');


const all_movie = async (req,res) => {
    try {
      const movies = await Movie.findAll();
      res.json(movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
      res.status(500).send("Internal server error");
    }
  };

  const create_movie = async (req,res) => {
    try {
      const movieData = req.body;

      if(!Array.isArray(movieData) || movieData.length === 0){
        res.status(400).json({message:"Expected an array of objects."});
        return;
      }

      const createdMovie = await Promise.all(movieData.map(async(movie) =>{
        const {MovieName , Rating , Language} = movie;

        if(!MovieName ||  !Rating || !Language){
          return null;
        }

        const newMovie = await Movie.create({
          MovieName,
          Rating,
          Language
        });

        return {movieId: newMovie.movieId, MovieName, Rating, Language};
      }));

      const sucessfulMovies = createdMovie.filter(movie => movie !==null);

      res.status(201).json({message: "Movies created succesfully", movies: sucessfulMovies});
    } catch (error) {
      console.error("Error creating new movie:", error);
      res.status(500).send("Server Error");
      
    }
  }
  
  module.exports = {all_movie ,create_movie};