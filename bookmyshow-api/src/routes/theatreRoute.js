const express = require('express');
const theatreController = require('../controllers/theatreController');

const router = express.Router();

router.get('/:theatreId/dates', theatreController.getTheatreDates);

module.exports = router;