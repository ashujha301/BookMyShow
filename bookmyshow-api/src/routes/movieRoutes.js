const express = require("express");
const {all_movie,create_movie,listTheatres} = require("../controllers/movieController");
const router = express.Router();

router.use(express.json());

router.get("/all", all_movie);
router.post("/create", create_movie);
router.get("/:id/date", listTheatres); //from showtime table

module.exports = router;