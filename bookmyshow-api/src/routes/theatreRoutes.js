const express = require('express');
const {all_theatre , theatreId , create_theatre} = require('../controllers/theatreController');
const router = express.Router();

router.get("/all", all_theatre);
router.get("/:id", theatreId);
router.post("/create",create_theatre);

module.exports = router;