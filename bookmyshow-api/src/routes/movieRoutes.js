const express = require("express");
const {all_movie,create_movie} = require("../controllers/movieController");
const router = express.Router();

router.use(express.json());

router.get("/all", all_movie);
router.post("/create", create_movie);

module.exports = router;