const express = require("express");
const router = express.Router();

const { createShow } = require("../controllers/adminController");

router.use(express.json()); //body-parser middleware

router.post("/create", createShow);
// router.get("/all",getAllShow);

module.exports = router;
